const sequelize = require("../../database/db");
const Venta = require("../../models/Venta") // Importa el modelo de venta
const DetalleVenta = require("../../models/DetalleVenta");
const Producto = require("../../models/Producto")
const Cliente = require("../../models/Cliente")

async function listarVentas(req, res) {
    try {
        const compras=await Venta.findAll(
            {
                include: [
                    { model: Cliente, attributes: ['documento'] }
                ], 
                attributes: [
                    'id_venta',
                    'fk_id_cliente',
                    'tipo_comprobante',
                    'fecha',
                    'total'
                ]
            });
        res.json(compras)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Error al obtener las compras"})
    }
}

async function listarVenta(req, res) {

    try{
        const id = req.params
        const venta = await Venta.findAll(id)
        res.json(venta)
    }catch (error){
        console.error(error)
        res.status(500).json({error: 'Error al obtener ventas'})
    }
}

async function createVentaConDetalle(req, res) {
    try {
        const dataVenta = req.body;

        // Añadir un console.log para verificar los datos de entrada
        console.log('Datos de venta recibidos:', dataVenta);

        await sequelize.transaction(async (t) => {
            // Asegurarse de que productos esté definido antes de acceder a sus propiedades
            const productos = dataVenta.productos || [];

            let ventaValida = true;

            // Verificar si hay suficiente cantidad en stock para cada producto
            for (const producto of productos) {
                const productoActual = await Producto.findByPk(producto.fk_producto);

                if (!productoActual || productoActual.cantidad < producto.cantidad) {
                    ventaValida = false;
                    break;
                }
            }

            if (ventaValida) {
                // Crear la venta
                const venta = await Venta.create({
                    fk_id_cliente: dataVenta.id_cliente.fk_id_cliente,
                    tipo_comprobante: dataVenta.tipo_comprobante,
                    fecha: dataVenta.fecha,
                    total: dataVenta.total
                }, { transaction: t });

                // Iterar sobre los productos y crear el detalle de la venta para cada uno
                for (const producto of productos) {
                    await DetalleVenta.create({
                        fk_venta: venta.id_venta,
                        fk_producto: producto.fk_producto,
                        cantidad: producto.cantidad,
                        precio: producto.precio,
                        subtotal: producto.subtotal
                    }, { transaction: t });

                    // Actualizar la cantidad del producto en stock
                    await Producto.update(
                        { cantidad: sequelize.literal(`CASE WHEN cantidad >= ${producto.cantidad} THEN cantidad - ${producto.cantidad} ELSE cantidad END`) },
                        { where: { id_producto: producto.fk_producto }, transaction: t }
                    );
                }

                res.status(201).json(venta);
            } else {
                res.status(400).json({ error: 'No hay suficiente cantidad en stock para realizar la venta' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar la venta' });
    }
}

// async function createVentaConDetalle(req, res) {
//     try {
//         const dataVenta = req.body;

//         // Añadir un console.log para verificar los datos de entrada
//         console.log('Datos de venta recibidos:', dataVenta);

//         await sequelize.transaction(async (t) => {
//             // Asegurarse de que productos esté definido antes de acceder a sus propiedades
//             const productos = dataVenta.productos || [];

//             // Crear la venta
//             const venta = await Venta.create({
//                 fk_id_cliente: dataVenta.id_cliente.fk_id_cliente,
//                 tipo_comprobante: dataVenta.tipo_comprobante,
//                 fecha: dataVenta.fecha,
//                 total: dataVenta.total
//             }, { transaction: t });

//             if (venta) {
//                 // Iterar sobre los productos y crear el detalle de la venta para cada uno
//                 for (const producto of productos) {
//                     await DetalleVenta.create({
//                         fk_venta: venta.id_venta,
//                         fk_producto: producto.fk_producto,
//                         cantidad: producto.cantidad,
//                         precio: producto.precio,
//                         subtotal: producto.subtotal
//                     }, { transaction: t });

//                     await Producto.update(
//                         { cantidad: sequelize.literal(`CASE WHEN cantidad >= ${producto.cantidad} THEN cantidad - ${producto.cantidad} ELSE cantidad END`) },
//                         { where: { id_producto: producto.fk_producto }, transaction: t }
//                     );
//                 }

//                 res.status(201).json(venta);
//             } else {
//                 res.status(500).json({ error: 'Error al crear la venta' });
//                 console.log(error);
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al realizar la venta' });
//     }
// }

module.exports = {
    listarVentas,
    listarVenta,
    createVentaConDetalle
};
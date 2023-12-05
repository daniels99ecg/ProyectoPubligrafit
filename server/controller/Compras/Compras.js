const Compras=require("../../models/Compras/Compras")
const sequelize=require("../../database/db")
const Compras_detalle=require('../../models/Detalle_Compra/Detalle_Compra')


async function listarCompras(req, res){
    try {
        const compras=await Compras.findAll()
        res.json(compras)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Error al obtener las compras"})
    }
}


async function crearCompras(req, res) {
    const datacompra = req.body;

    try {
        const nuevaCompra = await sequelize.transaction(async (t) => {
            // Crear la compra
            const createdCompra = await Compras.create({
                proveedor: datacompra.proveedor,
                cantidad: datacompra.cantidad,
                fecha: datacompra.fecha,
                total: datacompra.total
            }, { transaction: t });

            if (!createdCompra) {
                throw new Error('Error al crear la compra');
            }

            // Crear el detalle de la compra para cada insumo
            const insumos = datacompra.insumos || [];
            const detallesPromises = insumos.map(async (insumo) => {
                const nuevoDetalle = await Compras_detalle.create({
                    fk_compra: createdCompra.id_compra,
                    fk_insumo: insumo.fk_insumo,
                    cantidad: insumo.cantidad,
                    precio: insumo.precio,
                    iva: insumo.iva,
                    subtotal: insumo.subtotal
                }, { transaction: t });

                if (!nuevoDetalle) {
                    throw new Error('Error al crear el detalle de la compra');
                }
            });

            // Esperar a que todas las inserciones en detalle se completen
            await Promise.all(detallesPromises);

            return createdCompra; // Devolver la compra creada para enviarla como respuesta
        });

        // Respuesta al cliente con el objeto de compra creado
        res.status(201).json(nuevaCompra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar la compra' });
    }
}



module.exports={
    listarCompras,
    crearCompras
}
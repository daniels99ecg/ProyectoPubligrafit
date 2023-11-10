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


async function crearCompras(req, res){
    const datacompra = req.body;
    try { 
        await sequelize.transaction(async (t) => {
            const compras = await Compras.create({
                proveedor: datacompra.proveedor,
                cantidad: datacompra.cantidad,
                fecha: datacompra.fecha,
                total: datacompra.total
            }, { transaction: t });

            if (compras) {
                await Compras_detalle.create({
                    fk_compra: compras.id_compra,
                    fk_insumo: datacompra.insumo.fk_insumo,
                    cantidad: datacompra.cantidad,
                    precio: datacompra.precio,
                    iva: datacompra.iva,
                    subtotal: datacompra.subtotal
                }, { transaction: t });
                await t.commit();
                res.status(201).json(compras);
            } else {
                res.status(500).json({ error: 'Error al crear la compra' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar la compra' });
    }
}
module.exports={
    listarCompras,
    crearCompras
}
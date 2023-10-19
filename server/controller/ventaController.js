const Venta = require("../models/Venta")

async function listarVenta(req, res){

    try{
        const venta = await Venta.findAll()
        res.json(venta)
    }catch (error){
        console.error(error)
        res.status(500).json({error: 'Error al obtener ventas'})
    }
}

async function crearVenta(req, res){

    try{
        const dataVenta = req.body
        const venta = await Venta.create({
            fk_documento_cliente: dataVenta.fk_documento_cliente,
            tipo_comprobante: dataVenta.tipo_comprobante,
            fecha: dataVenta.fecha,
            total: dataVenta.total          
        })
        res.status(201).json(venta)
    }catch (error){
        console.error(error)
        res.status(500).json({error: 'Error al crear venta'})
    }
}

module.exports = {
    listarVenta,
    crearVenta
}
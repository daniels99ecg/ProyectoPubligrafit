const DetalleVenta = require("../models/DetalleVenta")

async function mostrarDetalle(req, res){
    
    try{
        const id = req.params.id
        const detalleventa = await DetalleVenta.findOne(id)
        res.json(detalleventa)
    }catch (error){
        console.error(error)
        res.status(500).json({error: 'Error al obtener detalle de venta'})
    }
}


const Compras=require("../../models/Compras/Compras")

async function listarCompras(req, res){
    try {
        const compras=await Compras.findAll()
        res.json(compras)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Error al obtener las compras"})
    }
}

module.exports={
    listarCompras
}
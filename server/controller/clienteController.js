const Cliente = require("../models/Cliente")


async function listarCliente(req, res){
    
    try{
        const cliente = await Cliente.findAll();
        res.json(cliente) ;    
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener clientes'});
    }
}

module.exports={
    listarCliente
}
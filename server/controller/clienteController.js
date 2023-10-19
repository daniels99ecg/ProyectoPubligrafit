const Cliente = require("../models/Cliente")


async function listarCliente(req, res){
    
    try{
        const cliente = await Cliente.findAll();
        res.json(cliente);    
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener clientes'});
    }
}

async function crearCliente(req, res){

    try{
        const dataCliente = req.body
        const cliente = await Cliente.create({
        documento: dataCliente.documento,
        nombre: dataCliente.nombre,
        apellido: dataCliente.apellido,
        telefono: dataCliente.telefono,
        direccion: dataCliente.direccion,
        email: dataCliente.email
        });
        res.status(201).json(cliente)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al crear cliente'});
    }
}

module.exports={
    listarCliente,
    crearCliente
}
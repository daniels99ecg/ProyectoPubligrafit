const Cliente = require("../models/Cliente")

async function listarClientes(req, res){
    
    try{
        const cliente = await Cliente.findAll();
        res.json(cliente);    
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener clientes'});
    }
}

async function listarCliente(req, res){

    try{
        const id = req.params.id
        const cliente = await Cliente.findByPk(id)
        res.json(cliente);
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener cliente'})
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

async function actualizarCliente(req, res){

    try{
        const id = req.params.id;
        const cliente = req.body;
        // Verifica si el cliente con el ID dado existe antes de intentar actualizarlo
        const clienteExistente = await Cliente.findByPk(id);
        if (!clienteExistente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Actualiza los campos del cliente
        await clienteExistente.update(
            {
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                telefono: cliente.telefono,
                direccion: cliente.direccion,
                email: cliente.email
            },
            {
                where: { documento: clienteExistente.documento }
            }
        );
        res.status(200).json(cliente)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar cliente'});
    }
}

module.exports={
    listarClientes,
    listarCliente,
    crearCliente,
    actualizarCliente
}
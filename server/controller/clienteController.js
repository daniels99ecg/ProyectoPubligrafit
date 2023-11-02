const Cliente = require("../models/Cliente")
const { Op } = require('sequelize');

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

async function crearCliente(req, res) {
    try {
        const dataCliente = req.body;
        const clienteExistente = await Cliente.findOne({
            where: {
                [Op.or]: [
                    { documento: dataCliente.documento },
                ],
            },
        });

        if (clienteExistente) {
            return res.status(400).json({ error: "El cliente ya existe en la base de datos" });
        }

        dataCliente.estado = true;

        const cliente = await Cliente.create(dataCliente);
        res.status(201).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear cliente' });
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

async function eliminarCliente(req, res) {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Elimina el cliente
        await cliente.destroy();

        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
}

async function desactivarCliente(req, res) {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Actualiza el estado del cliente a "deshabilitado" (false)
        await cliente.update({ estado: false });

        res.status(200).json({ message: 'Cliente deshabilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al deshabilitar cliente' });
    }
}

async function activarCliente(req, res) {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        await cliente.update({ estado: true });

        res.status(200).json({ message: 'Cliente habilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al habilitar cliente' });
    }
}

module.exports={
    listarClientes,
    listarCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    desactivarCliente,
    activarCliente
}
const Cliente = require("../models/Cliente")
const { Op } = require("sequelize")
const Orden = require("../models/Ficha_Tecnica/FichaTecnica")

async function existenteCliente(documento) {
    if (!documento) {
        return false; // O manejar de alguna manera especial si es undefined
    }

    const cliente = await Cliente.findOne({
        where: {
            documento: documento,
        },
    });

    return cliente !== null;
}

async function listarClientes(req, res) {
    try {
        const clientes = await Cliente.findAll();
        const clientesConVentas = await Promise.all(clientes.map(async (cliente) => {
            const ventasAsociadas = await Orden.findOne({
                where: {
                    fk_id_cliente: cliente.id_cliente, 
                },
            });

            return {
                ...cliente.toJSON(),
                tieneVentas: !!ventasAsociadas,
            };
        }));

        res.json(clientesConVentas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
}

async function listarCliente(req, res){

    try{
        const idCliente = req.params.id_cliente
        const cliente = await Cliente.findByPk(idCliente)
        res.json(cliente);
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener cliente'})
    }
}

async function crearCliente(req, res) {
    
    const dataCliente = req.body;
    try {
        const existingCliente = await Cliente.findOne({
            where: {
                documento: dataCliente.documento
            }
        });

        if (existingCliente) {
            return res.status(400).json({ error: 'Documento ya existente en la base de datos' });
        }

        const cliente = await Cliente.create({
        tipo_documento:dataCliente.tipo_documento,
        documento:dataCliente.documento,
        nombre:dataCliente.nombre,
        apellido:dataCliente.apellido,
        telefono:dataCliente.telefono,
        email:dataCliente.email,       
        direccion:dataCliente.direccion                 
      });
      dataCliente.estado = true;

      res.status(201).json(cliente)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear nuevo cliente' });  
    }
}

async function actualizarCliente(req, res) {
    
    const { id_cliente } = req.params;
    const {
      tipo_documento,
      documento,
      nombre,
      apellido,
      telefono,
      email,
      direccion
    } = req.body;
  
    try {
        const existingCliente = await Cliente.findOne({
            where: {
                documento: documento, id_cliente: {[Op.ne]: id_cliente}
            }
        });

        if (existingCliente) {
            return res.status(400).json({ error: 'Documento ya existente en la base de datos' });
        }
      const cliente = await Cliente.findByPk(id_cliente)
      if (!cliente) {
        return res.status(404).send('Cliente no encontrado')
      }
      cliente.tipo_documento = tipo_documento;
      cliente.documento = documento;
      cliente.nombre = nombre;
      cliente.apellido = apellido;
      cliente.telefono = telefono;
      cliente.email = email;
      cliente.direccion = direccion;
  
      await cliente.save();
  
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).send('Error al actualizar cliente');
    }
}

async function eliminarCliente(req, res) {
    try {
        const { id_cliente } = req.params;
        const cliente = await Cliente.findByPk(id_cliente);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        await cliente.destroy();

        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
}

async function desactivarCliente(req, res) {
    try {
        const { id_cliente } = req.params;
        const cliente = await Cliente.findByPk(id_cliente);
        
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
        const { id_cliente } = req.params;
        const cliente = await Cliente.findByPk(id_cliente);
        
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
    activarCliente,
    existenteCliente
}
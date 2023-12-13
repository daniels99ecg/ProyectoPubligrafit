const Rol=require("../../models/rol/Rol")
const sequelize=require("../../database/db");
const RolXPermiso = require("../../models/rol/RolxPermiso");
const Usuario =require('../../models/usuario/Usuario')
const Permiso=require('../../models/rol/Permiso')
async function listarRol(req, res){

    try {
        const rol = await Rol.findAll();
        const clientesConVentas = await Promise.all(rol.map(async (rol) => {
          const ventasAsociadas = await Usuario.findOne({
              where: {
                  fk_rol2: rol.id_rol, 
              },
          });

          return {
              ...rol.toJSON(),
              tieneVentas: !!ventasAsociadas,
          };
      }));

        res.json(clientesConVentas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
      }
    }

    async function listarporid(req, res){
      try {
        const userId = req.params.id;
        const user = await Rol.findByPk(userId);
  
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
      }
    }
  
    async function listarRolxPermiso(req, res){
      try {

          const rolxp = await RolXPermiso.findAll({
            include: [
              {
                model: Rol,
                attributes: ['nombre_rol'], // Selecciona el campo 'nombre_rol' de la tabla Rol
              },
              {
                model: Permiso,
                attributes: ['nombre_permiso'], // Agrega el campo 'nombre_permiso' de la tabla Permiso
              },
            
            ],
            attributes: [
              'id_rol_x_permiso',
              "fk_rol",
              'fk_permiso',
            // Asumiendo que quieres mostrar también el ID del rol
            ],
           
            
          });
          
          res.json(rolxp);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener los rolesxPermiso' });
        }
      }

async function createRol(req, res) {
      const dataRol = req.body;
    try {
      const t = await sequelize.transaction();

  
      try {

          const rol = await Rol.create({
            nombre_rol: dataRol.nombre_rol,
            fecha: dataRol.fecha,
            estado: 1,
          }, { transaction: t });
    
          // Verifica si se proporciona un array de permisos en dataRol
          if (dataRol.permisos && Array.isArray(dataRol.permisos)) {
            for (const permiso of dataRol.permisos) {
          

              await RolXPermiso.create({
                fk_rol: rol.id_rol,
                fk_permiso: permiso.id_permiso,
              }, { transaction: t });
            
          }
          }
    
          await t.commit();
          res.status(201).json(rol);
        
      } catch (error) {
        await t.rollback();
        throw error;
      
      }  } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Error al obtener rol' });

      }
    }
    const { Op } = require('sequelize');
    
    async function actualizarRol(req, res) {
      const { id } = req.params;
      const { 
        id_rol,
        nombre_rol,
        fecha,
        } = req.body;
  
      try {
        // Verificar si el documento ya existe, excluyendo al usuario actual
        const existingUsuario = await Rol.findOne({
          where: { nombre_rol: nombre_rol, id_rol: { [Op.ne]: id } }
        });
  
        if (existingUsuario) {
          return res.status(400).json({ error: 'El documento ya está registrado para otro usuario' });
        }
  
        const rol = await Rol.findByPk(id);
        if (!rol) {
          return res.status(404).send('Usuario no encontrado');
        }
  
        // Actualizar campos del usuario
        rol.id_rol = id_rol;
        rol.nombre_rol = nombre_rol;
        rol.fecha=fecha;
       
  
        await rol.save();
  
        console.log('Usuario actualizado:', rol.toJSON());
  
        return res.status(200).json(rol);
      } catch (error) {
        console.error('Error al actualizar el rol:', error);
        return res.status(500).send('Error al actualizar el rol');
      }
  }


async function desactivarCliente(req, res) {
  try {
    const id = req.params.id;
    const cliente = await Rol.findByPk(id);
      
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
      const cliente = await Rol.findByPk(id);
      
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

async function eliminar(req, res) {
  try {
    const id_rol = req.params.id_rol;
    const response = await Rol.destroy({ where: { id_rol: id_rol } });

    if (response === 1) {
      // Si se eliminó correctamente, response será 1.
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } else {
      // Si no se encontró el usuario o no se pudo eliminar, response será 0.
      res.status(404).json({ message: 'Usuario no encontrado o no se pudo eliminar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
}

    module.exports={
        listarRol,
        listarporid,
        listarRolxPermiso,
        createRol,
        actualizarRol,
        activarCliente,
        desactivarCliente,
        eliminar
    }
const Rol=require("../../models/rol/Rol")
const sequelize=require("../../database/db");
const RolXPermiso = require("../../models/rol/RolxPermiso");

async function listarRol(req, res){

    try {
        const rol = await Rol.findAll();
        res.json(rol);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
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



    module.exports={
        listarRol,
        createRol,
        activarCliente,
        desactivarCliente
    }
const Rol=require("../../models/rol/Rol")
const sequelize=require("../../database/db");
const RolXPermiso = require("../../models/rol/RolxPermiso");
const Usuario =require('../../models/usuario/Usuario')
const Permiso=require('../../models/rol/Permiso')
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

async function listaRoles(req, res){
  try {
    const roles = await Rol.findAll();
    
    // Utilizar un conjunto para almacenar nombres únicos de roles
    const rolesUnicos = new Set();

    // Filtrar roles duplicados y almacenar solo un rol por nombre
    const rolesFiltrados = roles.filter(rol => {
      if (!rolesUnicos.has(rol.nombre_rol)) {
        rolesUnicos.add(rol.nombre_rol);
        return true;
      }
      return false;
    });

    res.json(rolesFiltrados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

async function listarRol(req, res) {
  try {
    
    const rolxp = await RolXPermiso.findAll({
      include: [
        {
          model: Rol,
          attributes: ['id_rol','nombre_rol', 'estado'],
        },
        {
          model: Permiso,
          attributes: ['nombre_permiso'],
        },
        {
          model: Usuario,
          attributes: ['nombres'],
        },
      ],
      attributes: [
        'id_rol_x_permiso',
        'fk_rol',
        'fk_permiso',
        'fk_usuario'
      ],
    });

    // Estructura de datos para almacenar resultados finales
    const resultadoFinal = [];

    // Itera sobre los resultados de la consulta
    rolxp.forEach(entry => {
      const { id_rol_x_permiso, rol, usuario, permiso, estado } = entry;

      // Busca si ya existe una entrada para este usuario y rol
      const existente = resultadoFinal.find(item => item.usuario.nombres === usuario.nombres && item.rol.nombre_rol === rol.nombre_rol);

      // Si ya existe, agrega el permiso a la lista existente
      if (existente) {
        existente.permisos.push(permiso.nombre_permiso);
      } else {
        // Si no existe, crea una nueva entrada con el id, usuario, rol y lista de permisos
        resultadoFinal.push({
          id_rol_x_permiso,
          usuario,
          rol,
          permisos: [permiso.nombre_permiso],
          estado
        });
      }
    });

    res.json(resultadoFinal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

async function listarporid(req, res) {
  const { id_rol } = req.params;

  try {
    const ficha = await Rol.findOne({
      where: { id_rol: id_rol },
    });

    if (!ficha) {
      return res.status(404).json({ error: "Ficha no encontrada" });
    }

    const detalleFicha = await RolXPermiso.findAll({
      where: { fk_rol: ficha.id_rol },
      attributes: [
        "id_rol_x_permiso",
        "fk_rol",
        "fk_usuario",
        "fk_permiso"
      ],
      include: [
        {
          model: Usuario,
          attributes: ["id_usuario","nombres"],
        },
        {
          model: Permiso,
          attributes: ['id_permiso','nombre_permiso'],
        },{
         model:Rol,
         attributes: ['id_rol','nombre_rol'],
        }
      ],
    });

    const fichaConDetalles = {
      ...ficha.toJSON(),
      detalles: detalleFicha,
    };

    res.json(fichaConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la ficha" });
  }
}


    async function listarRolxPermiso(req, res) {
      try {
        
        // Consulta de los roles y permisos filtrados por el usuario actual
        const rolxp = await RolXPermiso.findAll({
          include: [
            {
              model: Rol,
              attributes: ['nombre_rol'],
            },
            {
              model: Permiso,
              attributes: ['nombre_permiso'],
            },
            {
              model: Usuario,
              attributes: ['nombres'],
              
            },
          ],
          attributes: [
            'id_rol_x_permiso',
            'fk_rol',
            'fk_permiso',
            'fk_usuario'
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

            // const existingRol = await Rol.findOne({
            //   where: { nombre_rol: dataRol.nombre_rol }
            // });
        
            // if (existingRol) {
            //   // Si el ID de usuario ya existe, muestra una alerta
            //   return res.status(400).json({ error: 'el nombre del rol ya existe' });
            // }


            // Insertar el rol
            const rol = await Rol.create({
              nombre_rol: dataRol.nombre_rol,
              fecha: dataRol.fecha,
            estado: 1,
              // Otras propiedades del rol
            }, { transaction: t });
      
            // Verifica si se proporciona un array de permisos en dataRol
            if (dataRol.permisos && Array.isArray(dataRol.permisos)) {
              // Insertar los permisos asociados al rol en la tabla RolXPermiso
              for (const permisoId of dataRol.permisos) {
                await RolXPermiso.create({
                  fk_rol: rol.id_rol,
                  fk_permiso: permisoId,
                  fk_usuario: dataRol.fk_usuario
                 }, { transaction: t });
              }
            }
      
            await t.commit();
            res.status(201).json({ message: 'Rol y permisos creados exitosamente' });
          } catch (error) {
            await t.rollback();
            throw error;
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al crear rol y permisos' });
        }
      }
      

    async function createRolNuevo(req, res) {
      const dataRol = req.body;
    try {
      const t = await sequelize.transaction();

  
      try {

        const existingRol = await Rol.findOne({
          where: { nombre_rol: dataRol.nombre_rol }
        });
    
        if (existingRol) {
          // Si el ID de usuario ya existe, muestra una alerta
          return res.status(400).json({ error: 'el nombre del rol ya existe' });
        }
    
          const rol = await Rol.create({
            nombre_rol: dataRol.nombre_rol,
            fecha: dataRol.fecha,
            estado: 1,
          }, { transaction: t });
  
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
      const { nombre_rol, permiso, fk_usuario } = req.body;
  
      try {
        
          const rol = await Rol.findByPk(id);
          if (!rol) {
              return res.status(404).send('Rol no encontrado');
          }
  
          // Actualizar el nombre del rol
          rol.nombre_rol = nombre_rol;
  
          // Guardar los cambios en el rol
          await rol.save();
  
          // Eliminar todos los permisos asociados al rol
          await RolXPermiso.destroy({ where: { fk_rol: id } });
  

          // Insertar los nuevos permisos asociados al rol
          if (permiso && permiso.length > 0) {
              await Promise.all(permiso.map(async (permisoId) => {
                  await RolXPermiso.create({ fk_rol: id, fk_permiso:permisoId, fk_usuario:fk_usuario});
              }));
          }
  
          console.log('Rol actualizado:', rol.toJSON());
  
          return res.status(200).json(rol);
      } catch (error) {
          console.error('Error al actualizar el rol:', error);
          return res.status(500).send('Error al actualizar el rol');
      }
  }
  
  


  async function desactivarCliente(req, res) {
    try {
      const id = req.params.id;
      const usuarios = await RolXPermiso.findAll({ where: { fk_rol: id } });
      const cliente = await Rol.findByPk(id);
  
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      // Actualiza el estado del cliente a "deshabilitado" (false)
      await cliente.update({ estado: false });
  
      // Actualiza el estado de los usuarios vinculados al rol
      for (const usuario of usuarios) {
        const usuarioActualizado = await Usuario.findByPk(usuario.fk_usuario);
        await usuarioActualizado.update({ estado: false });
      }
  
      res.status(200).json({ message: 'Cliente deshabilitado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al deshabilitar cliente' });
    }
  }

async function activarCliente(req, res) {
  try {
      const id = req.params.id;
      const usuarios = await RolXPermiso.findAll({ where: { fk_rol: id } });

      const cliente = await Rol.findByPk(id);
      
      if (!cliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      await cliente.update({ estado: true });
 // Actualiza el estado de los usuarios vinculados al rol
 for (const usuario of usuarios) {
  const usuarioActualizado = await Usuario.findByPk(usuario.fk_usuario);
  await usuarioActualizado.update({ estado: true });
}
      res.status(200).json({ message: 'Cliente habilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al habilitar cliente' });
  }
}

async function eliminar(req, res) {
  try {
    const id_rol = req.params.id_rol;
    const response = await RolXPermiso.destroy({ where: { fk_rol: id_rol } });
    const responses = await Rol.destroy({ where: { id_rol: id_rol } });

    if (response === 1 || responses ===1) {
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
        listaRoles,
        createRol,
        createRolNuevo,
        actualizarRol,
        activarCliente,
        desactivarCliente,
        eliminar
    }
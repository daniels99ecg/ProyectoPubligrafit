const Rol=require("../../models/rol/Rol")
const sequelize=require("../../database/db");
const RolXPermiso = require("../../models/rol/RolxPermiso");
const Usuario =require('../../models/usuario/Usuario')
const Permiso=require('../../models/rol/Permiso')
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

async function listaRoles(req, res){
  try {
    const rol = await Rol.findAll();
    const clientesConVentas = await Promise.all(rol.map(async (rol) => {
      const ventasAsociadas = await RolXPermiso.findOne({
          where: {
              fk_rol: rol.id_rol, 
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
          attributes: ["nombres"],
        },
        {
          model: Permiso,
          attributes: ['nombre_permiso'],
        },{
         model:Rol,
         attributes: ['nombre_rol'],
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



    // async function listarporid(req, res){
    //   try {
    //     const userId = req.params.id_rol;
    //     const user = await Rol.findByPk(userId);
  
    //     if (user) {
    //       res.json(user);
    //     } else {
    //       res.status(404).json({ message: 'Usuario no encontrado' });
    //     }
    //   } catch (error) {
    //     res.status(500).json({ message: 'Error en el servidor' });
    //   }
    // }

// async function listarporid(req, res){
//       try {
//         const id_rol_x_permiso = req.params.id_rol_x_permiso;
//         const rolXPermiso = await RolXPermiso.findOne({
//           where: {
//             id_rol_x_permiso: id_rol_x_permiso
//           },
//           include: [
//                     {
//                       model: Rol,
//                       attributes: ['nombre_rol'],
//                     },
//                             {
//                               model: Permiso,
//                               attributes: ['nombre_permiso'],
//                             },
//                             {
//                               model: Usuario,
//                               attributes: ['nombres'],
//                             },
//                   ]
//         });
    
//         if (rolXPermiso) {
//           res.json(rolXPermiso);
//         } else {
//           res.status(404).json({ message: 'RolXPermiso no encontrado' });
//         }
//       } catch (error) {
//         res.status(500).json({ message: 'Error en el servidor' });
//       }
//     }
    


    // async function listarporid(req, res) {
    //   const { fk_rol } = req.params;
    
    //   try {
    //     const rolxp = await RolXPermiso.findAll({
    //       where: { fk_rol: fk_rol },
    //       include: [
    //         {
    //           model: Rol,
    //           attributes: [ 'nombre_rol'],
    //         },
    //         {
    //           model: Permiso,
    //           attributes: ['nombre_permiso'],
    //         },
    //         {
    //           model: Usuario,
    //           attributes: ['nombres'],
    //         },
    //       ],
    //       attributes: [
    //         'id_rol_x_permiso',
    //         'fk_rol',
    //         'fk_permiso',
    //         'fk_usuario',
    //       ],
    //     });
    //     // Estructura de datos para almacenar el resultado final
    //    const resultadoFinal = [];
    
    //     // Itera sobre los resultados de la consulta
    // rolxp.forEach(entry => {
    //   const { id_rol_x_permiso, rol, usuario, permiso, estado } = entry;

    //   // Busca si ya existe una entrada para este usuario y rol
    //   const existente = resultadoFinal.find(item => item.usuario.nombres === usuario.nombres && item.rol.nombre_rol === rol.nombre_rol);

    //   // Si ya existe, agrega el permiso a la lista existente
    //   if (existente) {
    //     existente.permisos.push(permiso.nombre_permiso);
    //   } else {
    //     // Si no existe, crea una nueva entrada con el id, usuario, rol y lista de permisos
    //     resultadoFinal.push({
    //       id_rol_x_permiso,
    //       usuario,
    //       rol,
    //       permisos: [permiso.nombre_permiso],
    //       estado
    //     });
    //   }
    // });

    //     res.json(resultadoFinal);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Error al obtener la Ficha" });
    //   }
    // }
    
    


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

            const existingRol = await Rol.findOne({
              where: { nombre_rol: dataRol.nombre_rol }
            });
        
            if (existingRol) {
              // Si el ID de usuario ya existe, muestra una alerta
              return res.status(400).json({ error: 'el nombre del rol ya existe' });
            }


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
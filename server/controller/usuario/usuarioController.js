const Usuario=require("../../models/usuario/Usuario")

const Rol  = require('../../models/rol/Rol');

const bcrypt = require('bcrypt');


// async function listarUsuario(req, res){

//     try {
//         const usuario = await Usuario.findAll();
//         res.json(usuario);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al obtener usuarios' });
//       }
//     }

async function listarUsuario(req, res) {
  try {
    const usuariosConRoles = await Usuario.findAll({
      include: [
        {
          model: Rol,
          attributes: ['nombre_rol'], // Selecciona el campo 'nombre_rol' de la tabla Rol
        },
      ],
      attributes: [
        'id_usuario',
        'nombres',
        'apellidos',
        'email',
        'contrasena',
        'fk_rol2'
       // Asumiendo que quieres mostrar también el ID del rol
      ],
    });

    res.json(usuariosConRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los usuarios con roles' });
  }
 }


 async function listarporid(req, res){
  try {
    const userId = req.params.id;
    const user = await Usuario.findByPk(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
 }

 async function crearUsuario(req, res){
  const dataUsuario=req.body;
  try {
    const hashedPassword = await bcrypt.hash(dataUsuario.contrasena, 10);

    const usuario = await Usuario.create({
      id_usuario:dataUsuario.id_usuario,
      fk_rol2:dataUsuario.fk_rol2,
      nombres:dataUsuario.nombres,
      apellidos:dataUsuario.apellidos,
      email:dataUsuario.email,
      contrasena:hashedPassword,
      estado:1
    });
    res.status(201).json(usuario)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
 }   

 async function actualizarUsuario(req, res){
  const { id } = req.params;
  const { 
    id_usuario,
    fk_rol2,
    nombres,
    apellidos,
    email,
    contrasena,
    estado } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    usuario.id_usuario = id_usuario;
    usuario.fk_rol2 = fk_rol2;
    usuario.nombres = nombres;
    usuario.apellidos=apellidos;
    usuario.email=email;
    usuario.contrasena=contrasena;
    usuario.estado=estado

    await usuario.save();

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).send('Error al actualizar el usuario');
  }
 }

 async function actualizarEstado(req, res){

  try{
      const id_usuario = req.params.id;
      const nuevoEstado = req.body
      // Verifica si el cliente con el ID dado existe antes de intentar actualizarlo
      const usuarioExistente = await Usuario.findByPk(id_usuario);
      if (!usuarioExistente) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualiza los campos del cliente
      await Usuario.update(
          {
            
              estado: 0
          },
          {
              where: { id_usuario }
          }
      );
  }catch (error){
      console.error(error);
      res.status(500).json({error: 'Error al actualizar cliente'});
  }
}


module.exports={
    listarUsuario,
    crearUsuario,
    actualizarUsuario,
    listarporid,
    actualizarEstado
    
}
    
    
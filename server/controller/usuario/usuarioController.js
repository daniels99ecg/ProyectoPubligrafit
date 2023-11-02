const Usuario=require("../../models/usuario/Usuario")

const Rol  = require('../../models/rol/Rol');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


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
        'fk_rol2',
        'estado'
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

async function login(req, res){
  const datosUsuarios = req.body;

  const user = await Usuario.findOne({ where: { email:datosUsuarios.email, contrasena:datosUsuarios.contrasena } });

  if (user) {
     // Si las credenciales son correctas, genera un token JWT
     const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
      expiresIn: '1h' // Puedes ajustar la duración del token
    });
    res.json({ message: 'Login exitoso', token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
}

async function desactivarCliente(req, res) {
  try {
    const id = req.params.id;
    const cliente = await Usuario.findByPk(id);
      
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
      const cliente = await Usuario.findByPk(id);
      
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
    listarUsuario,
    crearUsuario,
    actualizarUsuario,
    listarporid,
    login,
    desactivarCliente,
    activarCliente

}
    
    
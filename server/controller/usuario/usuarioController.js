  const Usuario=require("../../models/usuario/Usuario")
  const Rol  = require('../../models/rol/Rol');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');

  // async function listarUsuario(req, res){

  //     try {
  //         const usuario = await Usuario.findAll();
  //         res.json(usuario);
  //       } catch (error) {
  //         console.error(error);
  //         res.status(500).json({ error: 'Error al obtener usuarios' });
  //       }
  //     }
  const secretKey = 'your-secret-key';

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
      // Verificar si el ID de usuario ya existe
      const existingUsuario = await Usuario.findOne({
        where: { id_usuario: dataUsuario.id_usuario }
      });

      if (existingUsuario) {
        // Si el ID de usuario ya existe, muestra una alerta
        return res.status(400).json({ error: 'el id de usuario ya existe' });
      }

      // Verificar si el correo electrónico ya existe
    const existingUsuarioEmail = await Usuario.findOne({
      where: { email: dataUsuario.email }
    });

    if (existingUsuarioEmail) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
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
      // Después de crear el usuario, genera un token JWT
      const token = jwt.sign({ userId: usuario.id }, 'your-secret-key', {
        expiresIn: '1h'
      });

      // Envía el token como respuesta
      res.status(201).json({ usuario, token });
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

  async function login(req, res) {

    const {email, contrasena} = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Authentication failed user' });
    }

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    if (!usuario.estado) {
      return res.status(401).json({ error: 'User is not authorized to login' });
    }

    const token = jwt.sign({ userId: usuario.id_usuario }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ token });
  }

  const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, secretKey, async (error, user) => {
      if (error) return res.sendStatus(401);

      const userFound = await Usuario.findByPk(user.id);
      if (!userFound) return res.sendStatus(401);

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };

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

  async function eliminar(req, res) {
    try {
      const id_usuario = req.params.id_usuario;
      const response = await Usuario.destroy({ where: { id_usuario: id_usuario } });

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
      listarUsuario,
      crearUsuario,
      actualizarUsuario,
      listarporid,
      login,
      desactivarCliente,
      activarCliente,
      eliminar,
      verifyToken

  }
      
      
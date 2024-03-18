  const Usuario=require("../../models/usuario/Usuario")
  const Rol  = require('../../models/rol/Rol');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const nodemailer = require('nodemailer');
  const RolXPermiso=require('../../models/rol/RolxPermiso')
  const sequelize=require("../../database/db")

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
      const usuariosConRoles = await sequelize.query(
        'SELECT usuarios.id_usuario, usuarios.tipo_documento, usuarios.documento, usuarios.nombres, ' +
      'usuarios.apellidos, usuarios.email, usuarios.contrasena, usuarios.estado, ' +
      'MAX(rols.nombre_rol) AS nombre_rol ' +
      'FROM usuarios ' +
      'LEFT JOIN rol_x_permisos ON usuarios.id_usuario = rol_x_permisos.fk_usuario ' +
      'LEFT JOIN rols ON rol_x_permisos.fk_rol = rols.id_rol ' +
      'GROUP BY usuarios.id_usuario',
        { type: sequelize.QueryTypes.SELECT }
      );
  

      const clientesConVentas = await Promise.all(usuariosConRoles.map(async (usuarios) => {
        const ventasAsociadas = await RolXPermiso.findOne({
            where: {
                fk_usuario: usuarios.id_usuario, 
            },
        });

        return {
            ...usuarios,
            tieneVentas: !!ventasAsociadas,
        };
    }));
    res.json(clientesConVentas);

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


  // ... Otras importaciones y código ...
  
  async function crearUsuario(req, res) {
    const dataUsuario = req.body;
    try {
      // Verificar si el ID de usuario ya existe
      const existingUsuario = await Usuario.findOne({
        where: { documento: dataUsuario.documento }
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
        tipo_documento:dataUsuario.tipo_documento,
        documento: dataUsuario.documento,
        // fk_rol2: dataUsuario.fk_rol2,
        nombres: dataUsuario.nombres,
        apellidos: dataUsuario.apellidos,
        email: dataUsuario.email,
        contrasena: hashedPassword,
        estado: 1
      });
  
      // Enviar correo electrónico
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'danielsenju1999@gmail.com', // Cambiar a tu dirección de correo electrónico
          pass: 'iifk mvtw vfga yery' // Cambiar a tu contraseña de correo electrónico
        }
      });
  
      const mailOptions = {
        from: 'danielsenju1999@gmail.com', // Cambiar a tu dirección de correo electrónico
        to: usuario.email,
        subject: 'Registro exitoso',
        html: `
        <h1>¡Hola ${dataUsuario.nombres} Bienvenido a Publigrafit!</h1>
        Nos alegra que estes aqui
        <p>Tu email para iniciar sesón es ${dataUsuario.email}</p>
        `
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
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
    

  const { Op } = require('sequelize');

  async function actualizarUsuario(req, res) {
      const { id } = req.params;
      const { 
        id_usuario,
        documento,
        tipo_documento,
        // fk_rol2,
        nombres,
        apellidos,
        email,
        contrasena,
        estado } = req.body;
  
      try {
        // Verificar si el documento ya existe, excluyendo al usuario actual
        const existingUsuario = await Usuario.findOne({
          where: { documento: documento, id_usuario: { [Op.ne]: id } }
        });
  
        if (existingUsuario) {
          return res.status(400).json({ error: 'El documento ya está registrado para otro usuario' });
        }
  
        // Verificar si el correo electrónico ya existe
        const existingUsuarioEmail = await Usuario.findOne({
          where: { email: email, id_usuario: { [Op.ne]: id } }
        });
  
        if (existingUsuarioEmail) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado para otro usuario' });
        }
  
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
          return res.status(404).send('Usuario no encontrado');
        }
  
        // Actualizar campos del usuario
        usuario.id_usuario = id_usuario;
        usuario.documento = documento;
        usuario.tipo_documento=tipo_documento;
        // usuario.fk_rol2 = fk_rol2;
        usuario.nombres = nombres;
        usuario.apellidos = apellidos;
        usuario.email = email;
        usuario.contrasena = contrasena;
        usuario.estado = estado;
  
        await usuario.save();
  
        console.log('Usuario actualizado:', usuario.toJSON());
  
        return res.status(200).json(usuario);
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).send('Error al actualizar el usuario');
      }
  }
  
  async function login(req, res) {
    const { email, contrasena } = req.body;
  
    try {
      // Buscar usuario en la tabla rol_x_permisos
      const usuarioConRolYPermisos = await sequelize.query(
        'SELECT usuarios.id_usuario, usuarios.nombres, usuarios.apellidos, usuarios.email, usuarios.contrasena, usuarios.estado, ' +
        'MAX(rols.nombre_rol) AS nombre_rol, GROUP_CONCAT(permisos.nombre_permiso) AS permisos ' +
        'FROM usuarios ' +
        'LEFT JOIN rol_x_permisos ON usuarios.id_usuario = rol_x_permisos.fk_usuario ' +
        'LEFT JOIN rols ON rol_x_permisos.fk_rol = rols.id_rol ' +
        'LEFT JOIN permisos ON rol_x_permisos.fk_permiso = permisos.id_permiso ' +
        'WHERE usuarios.email = :email ' +
        'GROUP BY usuarios.id_usuario',
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: { email },
        }
      );
  
      // Verificar si el usuario existe
      if (!usuarioConRolYPermisos || usuarioConRolYPermisos.length === 0) {
        return res.status(203).json({ error: 'Authentication failed' });
      }
  
      const usuario = usuarioConRolYPermisos[0];
  
      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Verificar el estado del usuario
      if (!usuario.estado) {
        return res.status(401).json({ error: 'User is not authorized to login' });
      }
  
      // Crear el token con la información del usuario
      const token = jwt.sign(
        {
          userId: usuario.id_usuario,
          nombre: usuario.nombres,
          apellido: usuario.apellidos,
          email: usuario.email,
          nombre_rol: usuario.nombre_rol,
          permisos: usuario.permisos.split(','), // Convertir la cadena de permisos en un array
        },
        secretKey,
        { expiresIn: '1h' }
      );
  
      // Establecer el token en las cookies de la respuesta
      res.cookie('token', token, { httpOnly: true });
  
      // Responder con el token y la información del usuario
      res.status(200).json({
        token,
        user: {
          id: usuario.id_usuario,
          nombre: usuario.nombres,
          apellido: usuario.apellidos,
          email: usuario.email,
          nombre_rol: usuario.nombre_rol,
          permisos: usuario.permisos.split(','), // Convertir la cadena de permisos en un array
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
    }
  }
  
  

  async function cambiarContrasena(req, res) {
    try {
      const { email, contrasena} = req.body;

    
      // Busca al usuario por su dirección de correo electrónico
      const usuario = await Usuario.findOne({ where: { email } });
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Hashea la nueva contraseña antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(contrasena, 10);
  
      // Actualiza la contraseña del usuario
      await usuario.update({ contrasena: hashedPassword });
  
      // Envía un correo electrónico informando sobre el cambio de contraseña
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'danielsenju1999@gmail.com',
          pass: 'iifk mvtw vfga yery'
        }
      });
  
      const mailOptions = {
        from: 'danielsenju1999@gmail.com',
        to: usuario.email,
        subject: 'Cambio de Contraseña Exitoso',
        html: `
          <h1>¡Hola ${usuario.nombres}!</h1>
          <p>Tu contraseña ha sido cambiada exitosamente.</p>
          <p>Si no has sido tu comunicate con el administrador</p>
        `
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Correo electrónico enviado: ' + info.response);
        }
      });
  
      res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
  }
  async function enviarEmail(req, res) {
    try {
      const { email } = req.body;
  
      // Busca al usuario por su dirección de correo electrónico
      const usuario = await Usuario.findOne({ where: { email } });
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const token = jwt.sign({ userId: usuario.id_usuario }, 'tu_secreto', { expiresIn: '1h' });

      // Envía un correo electrónico informando sobre el cambio de contraseña
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'danielsenju1999@gmail.com',
          pass: 'iifk mvtw vfga yery'
        }
      });
  
      const mailOptions = {
        from: 'danielsenju1999@gmail.com',
        to: usuario.email,
        subject: 'Cambio de Contraseña Exitoso',
        html: `
          <h1>¡Hola ${usuario.nombres}!</h1>
          <p>Tu dirección para cambiar la contraseña es: https://proyectopubligrafit.onrender.com/cambiarcontrasena?token=${token}</p>
        `
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Correo electrónico enviado: ' + info.response);
        }
      });
  
      res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
  } 
  // const verifyToken = async (req, res) => {
  //   const { token } = req.cookies;
  //   if (!token) return res.send(false);

  //   jwt.verify(token, secretKey, async (error, user) => {
  //     if (error) return res.sendStatus(401);

  //     const userFound = await Usuario.findByPk(user.id);
  //     if (!userFound) return res.sendStatus(401);

  //     return res.json({
  //       id: userFound._id,
  //       username: userFound.username,
  //       email: userFound.email,
  //     });
  //   });
  // };


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
  
      // Buscar el usuario que se va a eliminar
      const usuario = await Usuario.findByPk(id_usuario);
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // // Verificar el rol del usuario antes de eliminar
      // const rol = await Rol.findByPk(usuario.fk_rol2);
  
      // if (rol && rol.nombre_rol === 'Administrador') {
      //   return res.status(403).json({ message: 'No puedes eliminar un usuario con el rol de administrador' });
      // }
  
      // Si el usuario no tiene el rol de administrador, proceder con la eliminación
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
      cambiarContrasena,
      enviarEmail
  }
      
      
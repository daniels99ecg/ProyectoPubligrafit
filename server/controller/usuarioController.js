const Usuario=require("../models/Usuario")

async function listarUsuario(req, res){

    try {
        const usuario = await Usuario.findAll();
        res.json(usuario);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
      }
    }

 async function crearUsuario(req, res){
  const dataUsuario=req.body;
  try {
    const usuario = await Usuario.create({
      id_usuario:dataUsuario.id_usuario,
      fk_rol2:dataUsuario.fk_rol2,
      nombres:dataUsuario.nombres,
      apellidos:dataUsuario.apellidos,
      email:dataUsuario.email,
      contrasena:dataUsuario.contrasena,
      estado:dataUsuario.estado
    });
    res.status(201).json(usuario)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
 }   

module.exports={
    listarUsuario,
    crearUsuario
}
    
    
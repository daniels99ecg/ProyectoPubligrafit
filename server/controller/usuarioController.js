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
  try {
    const usuario = await Usuario.create({
      id_usuario:255,
      fk_rol2:1,
      nombres:"Pruebasapi",
      apellidos:"Soy una prueba",
      email:"pruebas@gmail.com",
      contrasena:"112",
      estado:1
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
    
    
const Router=require("express").Router()
const UsuarioController=require("../../controller/usuario/usuarioController")




Router.get("/", UsuarioController.listarUsuario);



Router.post("/create", UsuarioController.crearUsuario)

Router.put("/update/:id", UsuarioController.actualizarUsuario)

module.exports=Router;
const Router=require("express").Router()
const UsuarioController=require("../../controller/usuario/usuarioController")




Router.get("/", UsuarioController.listarUsuario);

Router.get("/:id", UsuarioController.listarporid);

Router.post("/create", UsuarioController.crearUsuario)

Router.put("/update/:id", UsuarioController.actualizarUsuario)

Router.put("/cambiar/:id", UsuarioController.actualizarEstado)

module.exports=Router;
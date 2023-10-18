const Router=require("express").Router()
const UsuarioController=require("../../controller/usuarioController")




Router.get("/", UsuarioController.listarUsuario);

Router.post("/create", UsuarioController.crearUsuario)

module.exports=Router;
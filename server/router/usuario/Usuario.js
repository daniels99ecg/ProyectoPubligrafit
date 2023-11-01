const Router=require("express").Router()
const UsuarioController=require("../../controller/usuario/usuarioController")




Router.get("/", UsuarioController.listarUsuario);

Router.get("/:id", UsuarioController.listarporid);

Router.post("/create", UsuarioController.crearUsuario)

Router.put("/update/:id", UsuarioController.actualizarUsuario)

Router.post("/login/", UsuarioController.login)

Router.put("/disable/:id", UsuarioController.desactivarCliente)

Router.put("/activate/:id", UsuarioController.activarCliente)




module.exports=Router;
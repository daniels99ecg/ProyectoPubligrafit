const Router=require("express").Router()
const RolController=require("../../controller/rol/rolController")




Router.get("/", RolController.listarRol);
Router.post("/create", RolController.createRol)

Router.put("/disable/:id", RolController.desactivarCliente)

Router.put("/activate/:id", RolController.activarCliente)

module.exports=Router;
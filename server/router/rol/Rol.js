const Router=require("express").Router()
const RolController=require("../../controller/rol/rolController")




Router.get("/", RolController.listarRol);
Router.post("/create", RolController.createRol)

module.exports=Router;
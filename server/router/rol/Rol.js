const Router=require("express").Router()
const RolController=require("../../controller/rol/rolController")




Router.get("/", RolController.listarRol);


module.exports=Router;
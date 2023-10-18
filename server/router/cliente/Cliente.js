const Router=require("express").Router()
const ClienteController=require("../../controller/clienteController")




Router.get("/", ClienteController.listarCliente);



module.exports=Router;
const Router=require("express").Router()
const RolController=require("../../controller/rol/rolController")
const PermisoController=require("../../controller/permiso/permisoController")



Router.get("/", RolController.listarRol);
Router.post("/create", RolController.createRol)

Router.put("/disable/:id", RolController.desactivarCliente)

Router.put("/activate/:id", RolController.activarCliente)

Router.get("/permiso", PermisoController.listarPermiso)

module.exports=Router;
const Router=require("express").Router()
const RolController=require("../../controller/rol/rolController")
const PermisoController=require("../../controller/permiso/permisoController")


Router.get("/", RolController.listarRol);
Router.get("/rolxpermiso", RolController.listarRolxPermiso);

Router.post("/create", RolController.createRol)
Router.post("/create/nuevo", RolController.createRolNuevo)
Router.put("/disable/:id", RolController.desactivarCliente)
Router.put("/activate/:id", RolController.activarCliente)
Router.get("/permiso", PermisoController.listarPermiso)
Router.delete("/delete/:id_rol", RolController.eliminar)
Router.get("/:id", RolController.listarporid);
Router.put("/update/:id", RolController.actualizarRol)

module.exports=Router;
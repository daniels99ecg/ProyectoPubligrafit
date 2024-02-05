const Router = require("express").Router();
const ProveedorController= require("../../controller/Proveedor/proveedorController")


Router.get("/", ProveedorController.listarProveedor);


module.exports=Router;

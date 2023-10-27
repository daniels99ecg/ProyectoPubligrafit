const Router = require("express").Router();
const ProductoController= require("../../controller/productoController")

Router.get("/", ProductoController.listarProductos);
Router.get("/:id", ProductoController.listarProducto);
Router.post("/create", ProductoController.crearProducto);
Router.put("/update/:id", ProductoController.actualizarProducto);

module.exports=Router;
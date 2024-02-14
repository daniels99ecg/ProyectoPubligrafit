const Router = require("express").Router();
const ProductoController= require("../../controller/productoController")
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


Router.get("/", ProductoController.listarProductos);
Router.get("/categorias", ProductoController.listarCategoria)

Router.get("/:id", ProductoController.listarProducto);
Router.post("/create",  ProductoController.crearProducto);
Router.put("/update/:id",ProductoController.actualizarProducto);
Router.delete("/delete/:id", ProductoController.eliminarProducto)
Router.put("/disable/:id", ProductoController.desactivarProducto)
Router.put("/activate/:id", ProductoController.activarProducto)

module.exports=Router;
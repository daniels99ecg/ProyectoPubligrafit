const Router = require("express").Router();
const InsumoController= require("../../controller/insumoController")

Router.get("/", InsumoController.listarInsumos);
Router.get("/:id", InsumoController.listarInsumo);
Router.post("/create", InsumoController.crearInsumo);
Router.put("/update/:id", InsumoController.actualizarInsumo);

module.exports=Router;
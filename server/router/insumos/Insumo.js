const Router = require("express").Router();
const InsumoController= require("../../controller/insumoController")

Router.get("/", InsumoController.listarInsumos);
Router.get("/:id", InsumoController.listarInsumo);
Router.post("/create", InsumoController.crearInsumo);
Router.put("/update/:id", InsumoController.actualizarInsumo);
Router.delete("/delete/:id", InsumoController.eliminarInsumo)
Router.put("/disable/:id", InsumoController.desactivarInsumo)
Router.put("/activate/:id", InsumoController.activarInsumo)

module.exports=Router;
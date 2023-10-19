const Router = require("express").Router()
const VentaController = require("../../controller/ventaController")

Router.get("/", VentaController.listarVenta)
Router.post("/create", VentaController.crearVenta)

module.exports = Router
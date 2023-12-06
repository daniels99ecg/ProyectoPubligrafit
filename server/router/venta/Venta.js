const Router = require("express").Router()
const VentaController = require("../../controller/venta/ventaController")

Router.get("/", VentaController.listarVentas)
Router.get("/venta/:id", VentaController.listarVenta)
Router.post("/create", VentaController.createVentaConDetalle)

module.exports = Router
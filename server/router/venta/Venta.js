const Router = require("express").Router()
const VentaController = require("../../controller/venta/ventaController")

Router.get("/", VentaController.listarVentas)
Router.get("/ventaOne/:id_venta", VentaController.listarVenta)
Router.post("/create", VentaController.createVentaConDetalle)
Router.get("/ventadia", VentaController.listarVentasPorFechas)
Router.get("/ventadeldia", VentaController.listarVentasPorFechasDia)
module.exports = Router
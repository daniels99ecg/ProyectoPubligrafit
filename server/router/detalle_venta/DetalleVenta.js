const Router = require("express").Router()
const detalleVentaController = require("../../controller/detalleVenta/detalleVentaController")

Router.get("/", detalleVentaController.mostrarDetalle);
Router.get("/detalle/:id_detalle_venta", detalleVentaController.detalleOne)

module.exports = Router
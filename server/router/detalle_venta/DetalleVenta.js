const Router = require("express").Router()
const detalleVentaController = require("../../controller/detalleVenta/detalleVentaController")

Router.get("/findOne", detalleVentaController.mostrarDetalle);

module.exports = Router
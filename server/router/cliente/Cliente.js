const Router = require("express").Router()
const ClienteController = require("../../controller/clienteController")

Router.get("/", ClienteController.listarCliente);
Router.post("/create", ClienteController.crearCliente);

module.exports = Router
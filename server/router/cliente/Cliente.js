const Router = require("express").Router()
const ClienteController = require("../../controller/cliente/clienteController")

Router.get("/", ClienteController.listarClientes);
Router.get("/:id_cliente", ClienteController.listarCliente);
Router.post("/create", ClienteController.crearCliente);
Router.get("/existente/:documento", ClienteController.existenteCliente)
Router.put("/update/:id_cliente", ClienteController.actualizarCliente)
Router.delete("/delete/:id_cliente", ClienteController.eliminarCliente)
Router.put("/disable/:id_cliente", ClienteController.desactivarCliente)
Router.put("/activate/:id_cliente", ClienteController.activarCliente)

module.exports = Router
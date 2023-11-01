const Router = require("express").Router()
const ClienteController = require("../../controller/clienteController")

Router.get("/", ClienteController.listarClientes);
Router.get("/:id", ClienteController.listarCliente);
Router.post("/create", ClienteController.crearCliente);
Router.put("/update/:id", ClienteController.actualizarCliente)
Router.delete("delete/:id", ClienteController.eliminarCliente)
Router.put("/disable/:id", ClienteController.desactivarCliente)
Router.put("/activate/:id", ClienteController.activarCliente)

module.exports = Router
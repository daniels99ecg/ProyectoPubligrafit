const Router = require("express").Router();
const FichaTecnicaController= require("../../controller/fichaTecnicaController")

Router.get("/", FichaTecnicaController.listarFichasTecnicas);
Router.get("/:id", FichaTecnicaController.listarFichaTecnica);
Router.post("/create", FichaTecnicaController.crearFichaTecnica);
Router.put("/update/:id", FichaTecnicaController.actualizarFichaTecnica);
Router.delete("/delete/:id", FichaTecnicaController.eliminarFichaTecnica); 
Router.put("/disable/:id", FichaTecnicaController.desactivarFichaTecnica); 
Router.put("/activate/:id", FichaTecnicaController.activarFichaTecnica);

module.exports=Router;
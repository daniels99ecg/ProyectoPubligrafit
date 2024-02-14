const Router = require("express").Router();
const FichaTecnicaController= require("../../controller/fichaTecnicaController")
const multer = require('multer');
const { subirArchivoFicha } = require("../../ProcesarImagenes/subirImagen");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Router.get("/", FichaTecnicaController.listarFichasTecnicas);
Router.get("/fichaOne/:id_ft", FichaTecnicaController.listarFichaTecnica);
Router.post("/create", subirArchivoFicha,FichaTecnicaController.crearFichaTecnica);
Router.put("/update/:id", FichaTecnicaController.actualizarFichaTecnica);
Router.delete("/delete/:id", FichaTecnicaController.eliminarFichaTecnica); 
Router.put("/disable/:id_ft", FichaTecnicaController.desactivarFichaTecnica); 
Router.put("/activate/:id_ft", FichaTecnicaController.activarFichaTecnica);

module.exports=Router;


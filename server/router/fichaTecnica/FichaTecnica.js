const Router = require("express").Router();
const OrdenesController= require("../../controller/ordenesController")
const multer = require('multer');
const { subirArchivoFicha } = require("../../ProcesarImagenes/subirImagen");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Router.get("/", OrdenesController.listarFichasTecnicas);
Router.get("/fichaOne/:id_ft", OrdenesController.listarFichaTecnica);
Router.post("/create", subirArchivoFicha,OrdenesController.crearFichaTecnica);
Router.put("/update/:id", OrdenesController.actualizarFichaTecnica);
Router.delete("/delete/:id", OrdenesController.eliminarFichaTecnica); 
Router.put("/disable/:id_ft", OrdenesController.desactivarFichaTecnica); 
Router.put("/activate/:id_ft", OrdenesController.activarFichaTecnica);

module.exports=Router;


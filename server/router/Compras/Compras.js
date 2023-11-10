const Router=require("express").Router()
const ComprasController=require("../../controller/Compras/Compras")
Router.get("/", ComprasController.listarCompras)
Router.post("/create", ComprasController.crearCompras)

module.exports=Router
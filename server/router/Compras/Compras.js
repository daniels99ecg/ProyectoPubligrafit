const Router=require("express").Router()
const ComprasController=require("../../controller/Compras/Compras")
Router.get("/", ComprasController.listarCompras)

module.exports=Router
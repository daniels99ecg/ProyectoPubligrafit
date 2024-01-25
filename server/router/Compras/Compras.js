const Router=require("express").Router()
const ComprasController=require("../../controller/Compras/Compras")
Router.get("/", ComprasController.listarCompras)

Router.get("/compraOne/:id_compra", ComprasController.listarcompra)

Router.post("/create", ComprasController.crearCompras)

module.exports=Router
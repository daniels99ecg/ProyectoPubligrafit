const Router=require("express").Router()
const ComprasController=require("../../controller/Compras/Compras")
Router.get("/", ComprasController.listarCompras)

Router.get("/compraOne/:id_compra", ComprasController.listarcompra)

Router.post("/create", ComprasController.crearCompras)

Router.get("/compradia", ComprasController.listarComprasPorFechas)

Router.get("/compradeldia", ComprasController.listarComprasPorFechasDia)

module.exports=Router
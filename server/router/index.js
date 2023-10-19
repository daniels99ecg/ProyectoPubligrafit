const Usuario=require("../router/usuario/Usuario")
const Cliente=require("../router/cliente/Cliente")
const Venta = require("../router/venta/Venta")

function resApi(app){
app.use("/usuario", Usuario)
app.use("/cliente", Cliente)
app.use("/venta", Venta)
}

module.exports=resApi;
const Usuario=require("../router/usuario/Usuario")
const Cliente=require("../router/cliente/Cliente")
const Venta = require("../router/venta/Venta")
const detalleVenta = require("../router/detalle_venta/DetalleVenta")
const Producto=require("../router/producto/Producto");

function resApi(app){
app.use("/usuario", Usuario)
app.use("/cliente", Cliente)
app.use("/venta", Venta)
app.use("/detalleVenta", detalleVenta)
app.use("/producto", Producto)
}

module.exports=resApi;
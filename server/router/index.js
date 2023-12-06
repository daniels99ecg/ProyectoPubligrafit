const Usuario=require("../router/usuario/Usuario")
const Rol=require("../router/rol/Rol")
const Producto=require("../router/producto/Producto");
const Insumo=require("../router/insumos/Insumo");
const FichaTecnica = require("../router/fichaTecnica/FichaTecnica");
const Compras=require("../router/Compras/Compras")
const Cliente=require("../router/cliente/Cliente")
const Venta = require("../router/venta/Venta")
const detalleVenta = require("../router/detalle_venta/DetalleVenta")
function resApi(app){
app.use("/usuario", Usuario)
app.use("/rol", Rol)
app.use("/cliente", Cliente)
app.use("/producto", Producto)
app.use("/insumo", Insumo)
app.use("/fichaTecnica", FichaTecnica)
app.use("/compras", Compras)
app.use("/cliente", Cliente)
app.use("/venta", Venta)
app.use("/detalleVenta", detalleVenta)


}





module.exports=resApi;
const Usuario=require("../router/usuario/Usuario")
const Cliente=require("../router/cliente/Cliente")
const Rol=require("../router/rol/Rol")
const Producto=require("../router/producto/Producto");
const Insumo=require("../router/insumos/Insumo");
const FichaTecnica = require("../router/fichaTecnica/FichaTecnica");

function resApi(app){
app.use("/usuario", Usuario)
app.use("/rol", Rol)
app.use("/cliente", Cliente)
app.use("/producto", Producto)
app.use("/insumo", Insumo)
app.use("/fichaTecnica", FichaTecnica)
}





module.exports=resApi;
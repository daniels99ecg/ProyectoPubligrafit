const Usuario=require("../router/usuario/Usuario")
const Producto=require("../router/producto/Producto");
const Insumo=require("../router/insumos/Insumo");
const FichaTecnica = require("../router/fichaTecnica/FichaTecnica");

function resApi(app){
app.use("/usuario", Usuario)
app.use("/producto", Producto)
app.use("/insumo", Insumo)
app.use("/fichaTecnica", FichaTecnica)
}

module.exports=resApi;
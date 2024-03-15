const Usuario=require("../router/usuario/Usuario")
const Rol=require("../router/rol/Rol")
const Insumo=require("../router/insumos/Insumo");
const FichaTecnica = require("../router/fichaTecnica/FichaTecnica");
const Compras=require("../router/Compras/Compras")
const Cliente=require("../router/cliente/Cliente")
const Proveedor=require("../router/proveedor/Proveedor")
function resApi(app){
app.use("/usuario", Usuario)
app.use("/rol", Rol)
app.use("/cliente", Cliente)
app.use("/insumo", Insumo)
app.use("/fichaTecnica", FichaTecnica)
app.use("/compras", Compras)
app.use("/cliente", Cliente)
app.use("/proveedor", Proveedor)

}





module.exports=resApi;
const Usuario=require("../router/usuario/Usuario")
const Compras=require("../router/Compras/Compras")
function resApi(app){
app.use("/usuario", Usuario)
app.use("/compras", Compras)
}

module.exports=resApi;
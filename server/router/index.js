const Usuario=require("../router/usuario/Usuario")
const Cliente=require("../router/cliente/Cliente")

const Rol=require("../router/rol/Rol")

function resApi(app){
app.use("/usuario", Usuario)
app.use("/rol", Rol)
app.use("/cliente", Cliente)

}


module.exports=resApi;
const Usuario=require("../router/usuario/Usuario")
const Rol=require("../router/rol/Rol")

function resApi(app){
app.use("/usuario", Usuario)
app.use("/rol", Rol)
}

module.exports=resApi;
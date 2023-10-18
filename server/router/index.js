const Usuario=require("../router/usuario/Usuario")
const Cliente=require("../router/cliente/Cliente");

function resApi(app){
app.use("/usuario", Usuario)
app.use("/cliente", Cliente)
}

module.exports=resApi;
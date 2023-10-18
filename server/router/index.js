const Usuario=require("../router/usuario/Usuario")

function resApi(app){
app.use("/usuario", Usuario)
}

module.exports=resApi;
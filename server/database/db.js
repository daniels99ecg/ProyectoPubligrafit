const {Sequelize} = require("sequelize")
const { Op } = require('sequelize');

const sequelize = new Sequelize("publigrafit", "root", "", {
    host:"localhost",
    dialect:"mysql"
    
})

async function conexion(){
try{
    await sequelize.authenticate();
    console.log("Conexion Exitosa")
}catch(error){
 console.log("Tenemos un error", error)
}
}

conexion()

module.exports=sequelize;
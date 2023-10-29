const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Compras=sequelize.define('compra', { //Crear el modelo de la base de datos que se va a consumir

id_compra:{
    type:DataTypes.INTEGER,
    primaryKey:true,
},

proveedor:DataTypes.STRING,

cantidad:DataTypes.INTEGER,

fecha:DataTypes.DATE,

total:DataTypes.INTEGER

},{
    timestamps:false // Para no crear campos de tiempo

})
module.exports=Compras
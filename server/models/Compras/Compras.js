const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Proveedores = require("../Proovedor/Proovedor")

const Compras=sequelize.define('compra', { //Crear el modelo de la base de datos que se va a consumir

id_compra:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},

fk_proveedor:DataTypes.INTEGER,

cantidad:DataTypes.INTEGER,

fecha:DataTypes.DATE,

total:DataTypes.INTEGER

},{
    timestamps:false // Para no crear campos de tiempo

})
Compras.belongsTo(Proveedores, { foreignKey: 'fk_proveedor' })
module.exports=Compras
const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Compras=require('../Compras/Compras')
const Insumo=require('../Insumo')
const Compras_detalle=sequelize.define('detalle_compras', { //Crear el modelo de la base de datos que se va a consumir

id_detalle_compra:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},

fk_compra:DataTypes.INTEGER,

fk_insumo:DataTypes.INTEGER,

cantidad:DataTypes.INTEGER,

precio:DataTypes.INTEGER,

iva:DataTypes.FLOAT,

subtotal:DataTypes.INTEGER

},{
    timestamps:false // Para no crear campos de tiempo

})
Compras_detalle.belongsTo(Compras,{foreignKey:'fk_compra'})
Compras_detalle.belongsTo(Insumo,{foreignKey:'fk_insumo'})
module.exports=Compras_detalle
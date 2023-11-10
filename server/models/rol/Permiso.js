
const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Permiso=sequelize.define('permiso',{
    id_permiso:{
           type:DataTypes.STRING,
           primaryKey:true,
           
    },
    nombre_permiso:DataTypes.STRING
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
  }
)
module.exports = Permiso
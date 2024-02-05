const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Proveedor=sequelize.define('proveedores',{
    id_proveedores:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:DataTypes.STRING,
    telefono:DataTypes.STRING,
    estado:DataTypes.BOOLEAN
   
},{
  timestamps: false, // Desactiva las columnas createdAt y updatedAt
 
}
);



module.exports = Proveedor
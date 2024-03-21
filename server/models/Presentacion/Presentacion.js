const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Presentacion=sequelize.define('presentaciones',{
    id_presentacion:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre_presentacion:DataTypes.STRING,
    
},{
  timestamps: false, // Desactiva las columnas createdAt y updatedAt
 
}
);



module.exports = Presentacion
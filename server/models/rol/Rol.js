const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")


       const Rol=sequelize.define('rols',{
                id_rol:{
                    type:DataTypes.INTEGER,
                    primaryKey:true,
                    autoIncrement:true
                },
                nombre_rol:DataTypes.STRING,
                fecha:DataTypes.DATE,
                estado:DataTypes.BOOLEAN
       },{
              timestamps: false // Desactiva las columnas createdAt y updatedAt
            }
       )

module.exports=Rol;
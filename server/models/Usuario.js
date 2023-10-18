const {DataTypes}=require("sequelize")
const sequelize=require("../database/db")


       const Usuario=sequelize.define('usuario',{
                id_usuario:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                },
              fk_rol2:DataTypes.INTEGER,
              nombres:DataTypes.STRING,
              apellidos:DataTypes.STRING,
              email:DataTypes.STRING,
              contrasena:DataTypes.STRING,
              estado:DataTypes.BOOLEAN
       },{
              timestamps: false // Desactiva las columnas createdAt y updatedAt
            }
       )
       


       
module.exports=Usuario;
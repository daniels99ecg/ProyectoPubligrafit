const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db");
const Rol = require("../rol/Rol");


       const Usuario=sequelize.define('usuario',{
                id_usuario:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                },
              tipo_documento:DataTypes.STRING,
              documento:DataTypes.STRING,  
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
       Usuario.belongsTo(Rol, { foreignKey: 'fk_rol2' });
module.exports=Usuario;
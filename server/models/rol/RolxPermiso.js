
const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Rol = require("../rol/Rol");
const Permiso = require("../rol/Permiso");



const RolXPermiso=sequelize.define('rol_x_permisos',{
    id_rol_x_permiso:{
           type:DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
    },
    fk_rol:DataTypes.INTEGER,
    fk_permiso: DataTypes.STRING 
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
  }
)
RolXPermiso.belongsTo(Rol, { foreignKey: 'fk_rol' });
RolXPermiso.belongsTo(Permiso, { foreignKey: 'fk_permiso' });


module.exports = RolXPermiso
const {DataTypes}=require("sequelize")
const sequelize= require("../../database/db")

const Insumo=sequelize.define("insumos",{
    id_insumo:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    precio:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    estado:{
        type:DataTypes.BOOLEAN,
    },
},{
    timestamps:false,
    
}
)

module.exports=Insumo;
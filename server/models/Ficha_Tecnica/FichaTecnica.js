const {DataTypes}=require("sequelize")
const sequelize= require("../../database/db")

const Orden=sequelize.define("ordenes",{
    id_ft:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre_ficha:{
        type:DataTypes.STRING
        
    },
    imagen_producto_final:{
        type:DataTypes.STRING
        
    },
    costo_final_producto:{
        type:DataTypes.DECIMAL
        
    },
    detalle:{
        type:DataTypes.STRING
        
    },
    mano_obra:{
        type:DataTypes.INTEGER,
    },
    estado:DataTypes.BOOLEAN,
    operacion:{
        type:DataTypes.STRING
    }

},{
    timestamps:false,
    
}
)

module.exports=Orden;
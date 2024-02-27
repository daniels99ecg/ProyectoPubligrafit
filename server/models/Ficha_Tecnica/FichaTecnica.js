const {DataTypes}=require("sequelize")
const sequelize= require("../../database/db")

const FichaTecnica=sequelize.define("fichas_tecnicas",{
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
    estado:DataTypes.BOOLEAN

},{
    timestamps:false,
    
}
)

module.exports=FichaTecnica;
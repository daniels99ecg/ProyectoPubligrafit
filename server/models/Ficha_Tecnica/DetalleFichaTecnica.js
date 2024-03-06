const {DataTypes}=require("sequelize")
const sequelize= require("../../database/db")
const Insumo= require("../Insumo")
const FichaTecnica= require("../Ficha_Tecnica/FichaTecnica")

const DetalleOrden=sequelize.define("detalle_ordenes",{
    id_detalle_ft:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fk_insumo:{
        type:DataTypes.INTEGER,
     
    },
    fk_ficha_tecnica:{
        type:DataTypes.INTEGER,
      
    },
    cantidad:{
        type:DataTypes.INTEGER,
       
    },
    precio:{
        type:DataTypes.FLOAT,
        
    },

},{
    timestamps:false,
    
}
)
DetalleOrden.belongsTo(Insumo, { foreignKey: 'fk_insumo' });
DetalleOrden.belongsTo(FichaTecnica, { foreignKey: 'fk_ficha_tecnica' });

module.exports=DetalleOrden;
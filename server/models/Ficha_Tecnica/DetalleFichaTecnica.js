const {DataTypes}=require("sequelize")
const sequelize= require("../../database/db")
const Insumo= require("../Insumo")
const FichaTecnica= require("../Ficha_Tecnica/FichaTecnica")

const DetalleFichaTecnica=sequelize.define("detalle_fichas_tecnicas",{
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
    costo_insumo:{
        type:DataTypes.FLOAT,
        
    },
    estado:DataTypes.BOOLEAN

},{
    timestamps:false,
    
}
)
DetalleFichaTecnica.belongsTo(Insumo, { foreignKey: 'fk_insumo' });
DetalleFichaTecnica.belongsTo(FichaTecnica, { foreignKey: 'fk_ficha_tecnica' });

module.exports=DetalleFichaTecnica;
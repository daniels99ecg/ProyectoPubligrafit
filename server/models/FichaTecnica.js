const {DataTypes}=require("sequelize")
const sequelize= require("../database/db")
const Insumo= require("./Insumo")

const FichaTecnica=sequelize.define("fichas_tecnicas",{
    id_ft:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fk_insumo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cantidad_insumo:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    costo_insumo:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    imagen_producto_final:{
        type:DataTypes.BLOB,
        allowNull:false
    },
    costo_final_producto:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    detalle:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    
}
)
FichaTecnica.belongsTo(Insumo, { foreignKey: 'fk_insumo' });

module.exports=FichaTecnica;
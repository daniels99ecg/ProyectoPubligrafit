const {DataTypes}=require("sequelize")
const sequelize= require("../database/db")
const Categoria = require('../models/Categoria')
const Presentacion = require('./Presentacion/Presentacion')

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
    fk_categoria:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    fk_presentacion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.BOOLEAN,
    },
},{
    timestamps:false,
    
});
Insumo.belongsTo(Categoria, { foreignKey: 'fk_categoria' })
Insumo.belongsTo(Presentacion, { foreignKey: 'fk_presentacion' })

module.exports=Insumo;
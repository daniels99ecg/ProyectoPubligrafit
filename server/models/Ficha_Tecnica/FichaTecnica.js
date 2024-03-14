const {DataTypes}=require("sequelize")
const sequelize= require("../../database/db")
const Cliente = require("../Cliente")
const Orden=sequelize.define("ordenes",{
    id_ft:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre_ficha:{
        type:DataTypes.STRING
        
    },
    fk_cliente:{
        type: DataTypes.INTEGER,

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
    operacion:{
        type:DataTypes.STRING
    },
    fecha:{
        type: DataTypes.DATE,
       
    },
    estado:DataTypes.BOOLEAN,
},{
    timestamps:false,
    
}
)
Orden.belongsTo(Cliente, { foreignKey: 'fk_cliente' })

module.exports=Orden;
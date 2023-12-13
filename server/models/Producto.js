const {DataTypes}=require("sequelize")
const sequelize= require("../database/db")
const Categoria= require("./Categoria")

const Producto=sequelize.define("productos",{
    id_producto:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fk_categoria:{
        type:DataTypes.INTEGER,
    },
    nombre_producto:{
        type:DataTypes.STRING,
    },
    precio:{
        type:DataTypes.FLOAT,
    },
     imagen:{
         type:DataTypes.STRING,
    },
    cantidad:{
        type:DataTypes.INTEGER,
        
    },
    estado:{
        type:DataTypes.BOOLEAN,
    },
},{
    timestamps:false,
    
}
)
Producto.belongsTo(Categoria, { foreignKey: 'fk_categoria' });

module.exports=Producto;
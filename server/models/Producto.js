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
        allowNull:false
    },
    nombre_producto:{
        type:DataTypes.STRING,
        allowNull:false
    },
    precio:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    // imagen:{
    //     type:DataTypes.BLOB,
    //     allowNull:false
    // },
    stock:{
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
Producto.belongsTo(Categoria, { foreignKey: 'fk_categoria' });

module.exports=Producto;
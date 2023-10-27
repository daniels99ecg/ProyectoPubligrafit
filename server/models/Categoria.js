const {DataTypes}=require("sequelize")
const sequelize= require("../database/db")


const Categoria=sequelize.define("categorias",{
    id_categoria:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    categoria:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    
}
)
module.exports=Categoria;
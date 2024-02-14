const {DataTypes}=require("sequelize")
const sequelize= require("../database/db")
const Categoria= require("./Categoria")
const FichaTecnica = require("./Ficha_Tecnica/FichaTecnica")

const Producto=sequelize.define("productos",{
    id_producto:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fk_categoria:{
        type:DataTypes.INTEGER,
    },
    precio:{
        type:DataTypes.FLOAT,
    },
    cantidad:{
        type:DataTypes.INTEGER,
    },
    estado:{
        type:DataTypes.BOOLEAN,
    },
    fk_ft:{
        type:DataTypes.INTEGER,
    }
},{
    timestamps:false,
    
}
)
Producto.belongsTo(Categoria, { foreignKey: 'fk_categoria' });
Producto.belongsTo(FichaTecnica, { foreignKey: 'fk_ft' });
module.exports=Producto;
const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")

const detalleventa = sequelize("detalle_ventas", {
    id_detalle_venta:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fk_venta:{
        type: DataTypes.INTEGER,
        allowNull: false // Asegura que la fk_venta_id no sea nula
    },    
    fk_producto:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    iva: DataTypes.FLOAT,
    subtotal: DataTypes.DECIMAL
    },{
        timestamps: false // Desactiva las columnas createdAt y updatedAt
    }
)

module.exports = detalleventa
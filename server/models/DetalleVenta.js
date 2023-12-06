const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")
const Producto = require("../models/Producto")
const Venta = require("../models/Venta")

const detalleVenta = sequelize.define("detalle_ventas", {
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
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio:{
        type: DataTypes.FLOAT,
        allowNull: false
    },    
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
        timestamps: false, // Desactiva las columnas createdAt y updatedAt
})

detalleVenta.belongsTo(Venta, { foreignKey: 'fk_venta' })
detalleVenta.belongsTo(Producto, { foreignKey: 'fk_producto' })

module.exports = detalleVenta
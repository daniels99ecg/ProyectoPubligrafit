const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")

const venta = sequelize.define("ventas", {
    id_venta:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fk_documento_cliente: DataTypes.INTEGER,
    tipo_comprobante: DataTypes.STRING,
    fecha: DataTypes.DATE,
    total: DataTypes.DECIMAL
    },{
        timestamps: false // Desactiva las columnas createdAt y updatedAt
    }
)

venta.hasMany(DetalleVenta, {
    foreignKey: 'fk_venta',
    as: 'detalleVentas', // Nombre de la relación
});


module.exports = venta;
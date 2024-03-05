const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")
const Cliente = require("../models/Cliente")

const venta = sequelize.define("ventas", {
    id_venta:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fk_id_cliente:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metodo_pago:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false
    },
    total:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    vendedor:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
        timestamps: false, // Desactiva las columnas createdAt y updatedAt
});

venta.belongsTo(Cliente, { foreignKey: 'fk_id_cliente' })

module.exports = venta;
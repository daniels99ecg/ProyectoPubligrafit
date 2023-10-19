const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")

const cliente = sequelize.define("clientes", {
    documento:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    email: DataTypes.STRING
    },{
        timestamps: false // Desactiva las columnas createdAt y updatedAt
    }
)

module.exports = cliente;
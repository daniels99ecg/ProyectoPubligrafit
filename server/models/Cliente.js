const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")

const cliente = sequelize.define("clientes", {
    id_cliente:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    tipo_documento:{
        type: DataTypes.STRING
    },   
    documento:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },    
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },    
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true // Puedes establecerlo como verdadero por defecto
    }
}, {
        timestamps: false, // Desactiva las columnas createdAt y updatedAt
});

module.exports = cliente;
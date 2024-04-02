const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Proposicao = sequelize.define('Proposicao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    ano: {
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    palavrasChave: {
        type: DataTypes.JSON, // Define o campo como JSON
        allowNull: true
    }
},
{
    timestamps: false,
        paranoid: false,
            underscored: false,
                freezeTableName: true,
                    tableName: 'Proposicao'
});

Proposicao.associate = function (models) {

}

module.exports = Proposicao;
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Resident = sequelize.define('Resident', {
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  residence_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cpf_cnpj: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Resident.sync();

module.exports = Resident;

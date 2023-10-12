const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://user:password@localhost:3306/database_name');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = User;

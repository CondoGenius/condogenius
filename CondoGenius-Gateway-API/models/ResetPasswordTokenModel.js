module.exports = (sequelize, Sequelize) => {
  const ResetPasswordToken = sequelize.define('passord_reset_tokens', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at' 
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at' 
    }
  });

  return ResetPasswordToken;
}

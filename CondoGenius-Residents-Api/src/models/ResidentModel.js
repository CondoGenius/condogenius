module.exports = (sequelize, Sequelize) => {
  const Resident = sequelize.define("resident", {
    user_id: {
      type: Sequelize.INTEGER
    },
    residence_id: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at' 
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at' 
    },
    is_active: {
      type: Sequelize.BOOLEAN
    }
  });

  return Resident;
};
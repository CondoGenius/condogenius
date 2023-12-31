module.exports = (sequelize, Sequelize) => {
  const Meeting = sequelize.define("meeting", {
    user_id: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    end_date: {
      type: Sequelize.DATE
    },
    hour: {
      type: Sequelize.STRING
    },
    duration: {
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
  });

  return Meeting;
};
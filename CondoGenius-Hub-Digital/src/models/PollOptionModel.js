module.exports = (sequelize, Sequelize) => {
  const PollOption = sequelize.define("poll_option", {
    poll_id: {
      type: Sequelize.INTEGER
    },
    percentage_of_votes: {
      type: Sequelize.INTEGER
    },
    quantity_of_votes: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
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

  return PollOption;
}
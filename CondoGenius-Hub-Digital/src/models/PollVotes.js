module.exports = (sequelize, Sequelize) => {
  const PollVote = sequelize.define("poll_votes", {
    poll_option_id: {
      type: Sequelize.INTEGER
    },
    resident_id: {
      type: Sequelize.INTEGER
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
}
module.exports = (sequelize, Sequelize) => {
  const PollVote = sequelize.define("poll_vote", {
    poll_id: {
      type: Sequelize.INTEGER
    },
    poll_option_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
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

  return PollVote;
}
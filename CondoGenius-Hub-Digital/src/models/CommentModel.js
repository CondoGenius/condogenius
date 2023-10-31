module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    post_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    content: {
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

  return Comment;
};
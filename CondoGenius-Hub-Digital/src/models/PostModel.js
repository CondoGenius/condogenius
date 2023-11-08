module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    user_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING
    },
    fixed: {
      type: Sequelize.BOOLEAN
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

  return Post;
}
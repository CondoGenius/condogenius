module.exports = (sequelize, Sequelize) => {
  const Residence = sequelize.define("residence", {
    number: {
      type: Sequelize.INTEGER
    },
    block: {
      type: Sequelize.INTEGER
    },
    floor: {
      type: Sequelize.STRING
    },
    complement: {
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

  return Residence;
};
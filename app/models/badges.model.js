module.exports = (sequelize, Sequelize) => {
  const Badges  = sequelize.define("badges ", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descripition: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    imageLink: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Badges ;
};

module.exports = (sequelize, Sequelize) => {
  const EagleExperiences = sequelize.define("eagleExperiences", {
    categoryId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    semesterFromGrad: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reflectionReq: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
    },
  });
  return EagleExperiences;
};

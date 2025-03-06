module.exports = (sequelize, Sequelize) => {
    const EagleTask = sequelize.define("eagleTask", {
      categoryId: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(1000),
      },
      semestersFromGrad: {
        type: Sequelize.INTEGER,
      },
      points: {
        type: Sequelize.INTEGER,
      },
      reflectionReq: {
        type: Sequelize.TINYINT(1),
      },
      rationale: {
        type: Sequelize.STRING(1000),
      },
      canUpload: {
        type: Sequelize.TINYINT(1),
      },
      prereqName: {
        type: Sequelize.STRING,
      },
      hyperLink: {
        type: Sequelize.STRING,
      },
    },{ timestamps: false });
    return EagleTask;
  };
  
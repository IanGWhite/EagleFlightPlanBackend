module.exports = (sequelize, Sequelize) => {
    const EagleTask = sequelize.define("eagleTask", {
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(1000),
      },
      category: {
        type: Sequelize.STRING,
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
      prereq: {
        type: Sequelize.STRING,
      },
      hyperLink: {
        type: Sequelize.STRING,
      },
    },{ timestamps: false });
    return EagleTask;
  };
  
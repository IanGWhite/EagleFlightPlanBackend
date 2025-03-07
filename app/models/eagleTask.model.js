module.exports = (sequelize, Sequelize) => {
    const EagleTask = sequelize.define("eagleTask", {
      categoryId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      semestersFromGrad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
  
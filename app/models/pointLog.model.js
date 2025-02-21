module.exports = (sequelize, Sequelize) => {
    const PointLog = sequelize.define("pointlog", {
      approvedBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pointDifference: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    return PointLog;
  };
  
module.exports = (sequelize, Sequelize) => {
    const StudentEagleTask = sequelize.define("studentEagleTask", {
      pointsAwarded: {
        type: Sequelize.INT,
        allowNull: false,
      },
      approvedBy: {
        type: Sequelize.VARCHAR,
        allowNull: false,
      },
      completionDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      approvalState: {
        type: Sequelize.TINYINT(2),
        allowNull: false,
      },
      Reflection: {
        type: Sequelize.VARCHAR(1000),
        allowNull: true,
      },
    });
    return StudentEagleTask;
  };
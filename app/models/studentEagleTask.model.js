module.exports = (sequelize, Sequelize) => {
    const StudentEagleTask = sequelize.define("studentEagleTask", {
      pointsAwarded: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      approvedBy: {
        type: Sequelize.STRING,
      },
      completionDate: {
        type: Sequelize.DATE,
      },
      approvalState: {
        type: Sequelize.TINYINT(2),
        allowNull: false,
      },
      Reflection: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      submissionDate: {
        type: Sequelize.DATE,
      },
    });
    return StudentEagleTask;
  };
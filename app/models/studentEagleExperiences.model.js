module.exports = (sequelize, Sequelize) => {
  const StudentEagleExperiences = sequelize.define("studentEagleExperiences", {
    pointsAwarded: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    approvedBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    completionDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    approvalState: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reflection: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
  });
  return StudentEagleExperiences;
};

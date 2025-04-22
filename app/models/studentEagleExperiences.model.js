module.exports = (sequelize, Sequelize) => {
  const StudentEagleExperiences = sequelize.define("studentEagleExperiences", {
    pointsAwarded: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    approvedBy: {
      type: Sequelize.STRING,
    },
    completionDate: {
      type: Sequelize.DATE,
      allowNull:true,
    },
    approvalState: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reflection: {
      type: Sequelize.STRING(1000),
    },
  });
  return StudentEagleExperiences;
};

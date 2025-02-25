module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canEditPoints: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      },
      canAddEvents: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      },
      canMarkAttendance: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      },
    });
    return Role;
  };
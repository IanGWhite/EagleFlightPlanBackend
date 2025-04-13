module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canEditPoints: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canAddEvents: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canMarkAttendance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
    return Role;
  };
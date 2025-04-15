module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semester", {
      dateStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateEnd: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Semester;
  };
  
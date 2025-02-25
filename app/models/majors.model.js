module.exports = (sequelize, Sequelize) => {
    const Majors = sequelize.define("majors", {
      name: {
        type: Sequelize.STRING,
      },
    });
    return Majors;
  };
  
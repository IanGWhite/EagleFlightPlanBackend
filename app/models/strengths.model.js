module.exports = (sequelize, Sequelize) => {
    const Strengths = sequelize.define("strengths", {
      name: {
        type: Sequelize.STRING,
      },
    });
    return Strengths;
  };
  
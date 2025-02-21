module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("document", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Document;
  };
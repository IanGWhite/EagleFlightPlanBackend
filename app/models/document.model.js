module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("document", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
    });
    return Document;
  };
module.exports = (sequelize, Sequelize) => {
    const ShopItem = sequelize.define("shopItem", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imageLink: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
    });
    return ShopItem;
  };
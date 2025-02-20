const db = require("../models");
const ShopItem = db.shopItem;
const Op = db.Sequelize.Op;
// Create and Save a new ShopItem
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ShopItem
  const shopItem = {
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
    imageLink: req.body.imageLink,
  };
  // Save ShopItem in the database
  ShopItem.create(shopItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ShopItem.",
      });
    });
};
// Retrieve all ShopItems from the database.
exports.findAll = (req, res) => {
  const shopItemId = req.query.shopItemId;
  var condition = shopItemId
    ? {
        shopItemId: {
          [Op.like]: `%${shopItemId}%`,
        },
      }
    : null;

  ShopItem.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving shopItems.",
      });
    });
};
// Retrieve all ShopItems for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  ShopItem.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving shopItems.",
      });
    });
};
// Find a single ShopItem with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ShopItem.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ShopItem with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ShopItem with id=" + id,
      });
    });
};
// Update a ShopItem by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ShopItem.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ShopItem was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ShopItem with id=${id}. Maybe ShopItem was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ShopItem with id=" + id,
      });
    });
};
// Delete a ShopItem with the specified id in the request
//todo: update to delete all items owned by shopItem (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ShopItem.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ShopItem was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ShopItem with id=${id}. Maybe ShopItem was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ShopItem with id=" + id,
      });
    });
};
// Delete all ShopItems from the database.
exports.deleteAll = (req, res) => {
  ShopItem.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ShopItems were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all shopItems.",
      });
    });
};


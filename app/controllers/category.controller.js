const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;
// Create and Save a new Category
exports.create = (req, res) => {
  //Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Category
  const category = {
    name: req.body.name,
    description: req.body.description,
    color: req.body.color,
  };
  // Save Category in the database
  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};
// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
  const categoryId = req.query.categoryId;
  var condition = categoryId
    ? {
        categoryId: {
          [Op.like]: `%${categoryId}%`,
        },
      }
    : null;

  Category.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categorys.",
      });
    });
};
// Retrieve all Categorys for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Category.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categorys.",
      });
    });
};
// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id,
      });
    });
};
// Update a Category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
};
// Delete a Category with the specified id in the request
//todo: update to delete all items owned by category (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};
// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Categorys were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categorys.",
      });
    });
};


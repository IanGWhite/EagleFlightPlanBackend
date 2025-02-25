const db = require("../models");
const Strength = db.strengths;
const Op = db.Sequelize.Op;
// Create and Save a new Strength
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Strength
  const strength = {
    name: req.body.name,
  };
  // Save Strength in the database
  Strength.create(strength)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Strength.",
      });
    });
};
// Retrieve all Strengths from the database.
exports.findAll = (req, res) => {
  const strengthId = req.query.strengthId;
  var condition = strengthId
    ? {
        strengthId: {
          [Op.like]: `%${strengthId}%`,
        },
      }
    : null;

  Strength.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving strengths.",
      });
    });
};
// Retrieve all Strengths for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Strength.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving strengths.",
      });
    });
};
// Find a single Strength with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Strength.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Strength with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Strength with id=" + id,
      });
    });
};
// Update a Strength by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Strength.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Strength was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Strength with id=${id}. Maybe Strength was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Strength with id=" + id,
      });
    });
};
// Delete a Strength with the specified id in the request
//todo: update to delete all items owned by strength (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Strength.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Strength was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Strength with id=${id}. Maybe Strength was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Strength with id=" + id,
      });
    });
};
// Delete all Strengths from the database.
exports.deleteAll = (req, res) => {
  Strength.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Strengths were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all strengths.",
      });
    });
};


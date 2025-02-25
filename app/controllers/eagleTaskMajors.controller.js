const db = require("../models");
const EagleTaskMajor = db.eagleTaskMajors;
const Op = db.Sequelize.Op;
// Create and Save a new EagleTaskMajor
exports.create = (req, res) => {
  //Validate request
  /*
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  */
  // Create a EagleTaskMajor
  const eagleTaskMajor = {

  };
  // Save EagleTaskMajor in the database
  EagleTaskMajor.create(eagleTaskMajor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EagleTaskMajor.",
      });
    });
};
// Retrieve all EagleTaskMajors from the database.
exports.findAll = (req, res) => {
  const eagleTaskMajorId = req.query.eagleTaskMajorId;
  var condition = eagleTaskMajorId
    ? {
        eagleTaskMajorId: {
          [Op.like]: `%${eagleTaskMajorId}%`,
        },
      }
    : null;

  EagleTaskMajor.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleTaskMajors.",
      });
    });
};
// Retrieve all EagleTaskMajors for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  EagleTaskMajor.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleTaskMajors.",
      });
    });
};
// Find a single EagleTaskMajor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EagleTaskMajor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EagleTaskMajor with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EagleTaskMajor with id=" + id,
      });
    });
};
// Update a EagleTaskMajor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EagleTaskMajor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleTaskMajor was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EagleTaskMajor with id=${id}. Maybe EagleTaskMajor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EagleTaskMajor with id=" + id,
      });
    });
};
// Delete a EagleTaskMajor with the specified id in the request
//todo: update to delete all items owned by eagleTaskMajor (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  EagleTaskMajor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleTaskMajor was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EagleTaskMajor with id=${id}. Maybe EagleTaskMajor was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EagleTaskMajor with id=" + id,
      });
    });
};
// Delete all EagleTaskMajors from the database.
exports.deleteAll = (req, res) => {
  EagleTaskMajor.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} EagleTaskMajors were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eagleTaskMajors.",
      });
    });
};


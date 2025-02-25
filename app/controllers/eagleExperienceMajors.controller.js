const db = require("../models");
const EagleExperienceMajor = db.eagleExperienceMajors;
const Op = db.Sequelize.Op;
// Create and Save a new EagleExperienceMajor
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a EagleExperienceMajor
  const eagleExperienceMajor = {

  };
  // Save EagleExperienceMajor in the database
  EagleExperienceMajor.create(eagleExperienceMajor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EagleExperienceMajor.",
      });
    });
};
// Retrieve all EagleExperienceMajors from the database.
exports.findAll = (req, res) => {
  const eagleExperienceMajorId = req.query.eagleExperienceMajorId;
  var condition = eagleExperienceMajorId
    ? {
        eagleExperienceMajorId: {
          [Op.like]: `%${eagleExperienceMajorId}%`,
        },
      }
    : null;

  EagleExperienceMajor.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleExperienceMajors.",
      });
    });
};
// Retrieve all EagleExperienceMajors for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  EagleExperienceMajor.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleExperienceMajors.",
      });
    });
};
// Find a single EagleExperienceMajor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EagleExperienceMajor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EagleExperienceMajor with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EagleExperienceMajor with id=" + id,
      });
    });
};
// Update a EagleExperienceMajor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EagleExperienceMajor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleExperienceMajor was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EagleExperienceMajor with id=${id}. Maybe EagleExperienceMajor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EagleExperienceMajor with id=" + id,
      });
    });
};
// Delete a EagleExperienceMajor with the specified id in the request
//todo: update to delete all items owned by eagleExperienceMajor (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  EagleExperienceMajor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleExperienceMajor was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EagleExperienceMajor with id=${id}. Maybe EagleExperienceMajor was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EagleExperienceMajor with id=" + id,
      });
    });
};
// Delete all EagleExperienceMajors from the database.
exports.deleteAll = (req, res) => {
  EagleExperienceMajor.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} EagleExperienceMajors were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eagleExperienceMajors.",
      });
    });
};


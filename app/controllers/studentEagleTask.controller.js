const db = require("../models");
const StudentEagleTask = db.studentEagleTask;
const Op = db.Sequelize.Op;
// Create and Save a new StudentEagleTask
exports.create = (req, res) => {
  //Validate request
  /*
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  */

  // Create a StudentEagleTask
  const studentEagleTask = {
    eagleFlightPlanId: req.params.eagleFlightPlanId,
    taskId: req.params.taskId,
    pointsAwarded: req.body.pointsAwarded,
    approvedBy: req.body.approvedBy,
    completionDate: req.body.completionDate,
    approvalState: req.body.approvalState,
    reflection: req.body.reflection,
    submissionDate: req.body.submissionDate,
  };
  // Save StudentEagleTask in the database
  StudentEagleTask.create(studentEagleTask)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the StudentEagleTask.",
      });
    });
};
// Retrieve all StudentEagleTasks from the database.
exports.findAll = (req, res) => {
  const studentEagleTaskId = req.query.studentEagleTaskId;
  var condition = studentEagleTaskId
    ? {
        studentEagleTaskId: {
          [Op.like]: `%${studentEagleTaskId}%`,
        },
      }
    : null;

  StudentEagleTask.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentEagleTasks.",
      });
    });
};
// Retrieve all StudentEagleTasks for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  StudentEagleTask.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentEagleTasks.",
      });
    });
};
// Find a single StudentEagleTask with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentEagleTask.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find StudentEagleTask with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving StudentEagleTask with id=" + id,
      });
    });
};
// Update a StudentEagleTask by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentEagleTask.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentEagleTask was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update StudentEagleTask with id=${id}. Maybe StudentEagleTask was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating StudentEagleTask with id=" + id,
      });
    });
};
// Delete a StudentEagleTask with the specified id in the request
//todo: update to delete all items owned by studentEagleTask (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentEagleTask.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentEagleTask was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete StudentEagleTask with id=${id}. Maybe StudentEagleTask was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete StudentEagleTask with id=" + id,
      });
    });
};
// Delete all StudentEagleTasks from the database.
exports.deleteAll = (req, res) => {
  StudentEagleTask.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} StudentEagleTasks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all studentEagleTasks.",
      });
    });
};


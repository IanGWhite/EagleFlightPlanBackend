const db = require("../models");
const EagleTask = db.eagleTask;
const Op = db.Sequelize.Op;
// Create and Save a new EagleTask
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a EagleTask
  const eagleTask = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    semestersFromGrad: req.body.semestersFromGrad,
    points: req.body.points,
    reflectionReq: req.body.reflectionReq,
    rationale: req.body.rationale,
    canUpload: req.body.canUpload,
    prereqName: req.body.prereqName,
    hyperLink: req.body.hyperlink,
  };
  // Save EagleTask in the database
  EagleTask.create(eagleTask)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EagleTask.",
      });
    });
};
// Retrieve all EagleTasks from the database.
exports.findAll = (req, res) => {
  const eagleTaskId = req.query.eagleTaskId;
  var condition = eagleTaskId
    ? {
        eagleTaskId: {
          [Op.like]: `%${eagleTaskId}%`,
        },
      }
    : null;

  EagleTask.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleTasks.",
      });
    });
};
// Retrieve all EagleTasks for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  EagleTask.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleTasks.",
      });
    });
};
// Find a single EagleTask with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EagleTask.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EagleTask with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EagleTask with id=" + id,
      });
    });
};
// Update a EagleTask by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EagleTask.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleTask was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EagleTask with id=${id}. Maybe EagleTask was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EagleTask with id=" + id,
      });
    });
};
// Delete a EagleTask with the specified id in the request
//todo: update to delete all items owned by eagleTask (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  EagleTask.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleTask was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EagleTask with id=${id}. Maybe EagleTask was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EagleTask with id=" + id,
      });
    });
};
// Delete all EagleTasks from the database.
exports.deleteAll = (req, res) => {
  EagleTask.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} EagleTasks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eagleTasks.",
      });
    });
};


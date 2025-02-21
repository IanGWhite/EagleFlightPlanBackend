const db = require("../models");
const PointLog = db.pointLog;
const Op = db.Sequelize.Op;
// Create and Save a new PointLog
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

  // Create a PointLog
  const pointLog = {
    approvedBy: req.body.approvedBy,
    pointDifference: req.body.pointDifference,
    date: req.body.date,
    studentId: req.params.studentId,
    shopItemId: req.body.shopItemId,
  };
  // Save PointLog in the database
  PointLog.create(pointLog)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PointLog.",
      });
    });
};
// Retrieve all PointLogs from the database.
exports.findAll = (req, res) => {
  const pointLogId = req.query.pointLogId;
  var condition = pointLogId
    ? {
        pointLogId: {
          [Op.like]: `%${pointLogId}%`,
        },
      }
    : null;

  PointLog.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pointLogs.",
      });
    });
};
// Retrieve all PointLogs for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  PointLog.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pointLogs.",
      });
    });
};
// Find a single PointLog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  PointLog.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PointLog with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PointLog with id=" + id,
      });
    });
};
// Update a PointLog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  PointLog.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PointLog was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PointLog with id=${id}. Maybe PointLog was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PointLog with id=" + id,
      });
    });
};
// Delete a PointLog with the specified id in the request
//todo: update to delete all items owned by pointLog (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  PointLog.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PointLog was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PointLog with id=${id}. Maybe PointLog was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PointLog with id=" + id,
      });
    });
};
// Delete all PointLogs from the database.
exports.deleteAll = (req, res) => {
  PointLog.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} PointLogs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pointLogs.",
      });
    });
};


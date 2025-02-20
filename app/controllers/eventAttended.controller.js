const db = require("../models");
const EventAttended = db.eventAttended;
const Op = db.Sequelize.Op;
// Create and Save a new EventAttended
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a EventAttended
  const eventAttended = {
    studentId: req.params.studentId,
    eventId: req.params.eventId,
  };
  // Save EventAttended in the database
  EventAttended.create(eventAttended)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EventAttended.",
      });
    });
};
// Retrieve all EventAttendeds from the database.
exports.findAll = (req, res) => {
  const eventAttendedId = req.query.eventAttendedId;
  var condition = eventAttendedId
    ? {
        eventAttendedId: {
          [Op.like]: `%${eventAttendedId}%`,
        },
      }
    : null;

  EventAttended.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eventAttendeds.",
      });
    });
};
// Retrieve all EventAttendeds for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  EventAttended.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eventAttendeds.",
      });
    });
};
// Find a single EventAttended with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EventAttended.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EventAttended with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EventAttended with id=" + id,
      });
    });
};
// Update a EventAttended by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EventAttended.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EventAttended was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EventAttended with id=${id}. Maybe EventAttended was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EventAttended with id=" + id,
      });
    });
};
// Delete a EventAttended with the specified id in the request
//todo: update to delete all items owned by eventAttended (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  EventAttended.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EventAttended was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EventAttended with id=${id}. Maybe EventAttended was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EventAttended with id=" + id,
      });
    });
};
// Delete all EventAttendeds from the database.
exports.deleteAll = (req, res) => {
  EventAttended.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} EventAttendeds were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eventAttendeds.",
      });
    });
};


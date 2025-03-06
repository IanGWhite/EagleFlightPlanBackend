const db = require("../models");
const EagleExperienceEvent = db.eagleExperienceEvent;
const Op = db.Sequelize.Op;
// Create and Save a new EagleExperienceEvent
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

  // Create a EagleExperienceEvent
  const eagleExperienceEvent = {
    eagleExperiencesId: req.params.eagleExperiencesId,
    eventId: req.params.eventId,
  };
  // Save EagleExperienceEvent in the database
  EagleExperienceEvent.create(eagleExperienceEvent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EagleExperienceEvent.",
      });
    });
};
// Retrieve all EagleExperienceEvents from the database.
exports.findAll = (req, res) => {
  const eagleExperienceEventId = req.query.eagleExperienceEventId;
  var condition = eagleExperienceEventId
    ? {
        eagleExperienceEventId: {
          [Op.like]: `%${eagleExperienceEventId}%`,
        },
      }
    : null;

  EagleExperienceEvent.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleExperienceEvents.",
      });
    });
};
// Retrieve all EagleExperienceEvents for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  EagleExperienceEvent.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleExperienceEvents.",
      });
    });
};
// Find a single EagleExperienceEvent with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EagleExperienceEvent.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EagleExperienceEvent with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EagleExperienceEvent with id=" + id,
      });
    });
};
// Update a EagleExperienceEvent by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EagleExperienceEvent.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleExperienceEvent was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EagleExperienceEvent with id=${id}. Maybe EagleExperienceEvent was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EagleExperienceEvent with id=" + id,
      });
    });
};
// Delete a EagleExperienceEvent with the specified id in the request
//todo: update to delete all items owned by eagleExperienceEvent (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  EagleExperienceEvent.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleExperienceEvent was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EagleExperienceEvent with id=${id}. Maybe EagleExperienceEvent was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EagleExperienceEvent with id=" + id,
      });
    });
};
// Delete all EagleExperienceEvents from the database.
exports.deleteAll = (req, res) => {
  EagleExperienceEvent.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} EagleExperienceEvents were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eagleExperienceEvents.",
      });
    });
};


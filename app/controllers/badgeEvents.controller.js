const db = require("../models");
const BadgeEvents = db.badgeEvents;
const Op = db.Sequelize.Op;
// Create and Save a new BadgeEvents
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a BadgeEvents
  const badgeEvents = {
    eventId: req.params.eventId,
    badgesId: req.params.badgesId,
  };
  // Save BadgeEvents in the database
  BadgeEvents.create(badgeEvents)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BadgeEvents.",
      });
    });
};
// Retrieve all BadgeEventss from the database.
exports.findAll = (req, res) => {
  const badgeEventsId = req.query.badgeEventsId;
  var condition = badgeEventsId
    ? {
        badgeEventsId: {
          [Op.like]: `%${badgeEventsId}%`,
        },
      }
    : null;

  BadgeEvents.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving badgeEventss.",
      });
    });
};
// Find a single BadgeEvents with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  BadgeEvents.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find BadgeEvents with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving BadgeEvents with id=" + id,
      });
    });
};
// Update a BadgeEvents by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  BadgeEvents.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BadgeEvents was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update BadgeEvents with id=${id}. Maybe BadgeEvents was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BadgeEvents with id=" + id,
      });
    });
};
// Delete a BadgeEvents with the specified id in the request
//todo: update to delete all items owned by badgeEvents (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  BadgeEvents.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BadgeEvents was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete BadgeEvents with id=${id}. Maybe BadgeEvents was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BadgeEvents with id=" + id,
      });
    });
};
// Delete all BadgeEventss from the database.
exports.deleteAll = (req, res) => {
  BadgeEvents.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} BadgeEventss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all badgeEventss.",
      });
    });
};


const db = require("../models");
const BadgeTasks = db.badgeTasks;
const Op = db.Sequelize.Op;
// Create and Save a new BadgeTasks
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a BadgeTasks
  const badgeTasks = {
    eagleTaskId: req.params.eagleTaskId,
    badgesId: req.params.badgesId,
  };
  // Save BadgeTasks in the database
  BadgeTasks.create(badgeTasks)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BadgeTasks.",
      });
    });
};
// Retrieve all BadgeTaskss from the database.
exports.findAll = (req, res) => {
  const badgeTasksId = req.query.badgeTasksId;
  var condition = badgeTasksId
    ? {
        badgeTasksId: {
          [Op.like]: `%${badgeTasksId}%`,
        },
      }
    : null;

  BadgeTasks.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving badgeTaskss.",
      });
    });
};
// Find a single BadgeTasks with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  BadgeTasks.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find BadgeTasks with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving BadgeTasks with id=" + id,
      });
    });
};
// Update a BadgeTasks by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  BadgeTasks.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BadgeTasks was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update BadgeTasks with id=${id}. Maybe BadgeTasks was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BadgeTasks with id=" + id,
      });
    });
};
// Delete a BadgeTasks with the specified id in the request
//todo: update to delete all items owned by badgeTasks (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  BadgeTasks.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BadgeTasks was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete BadgeTasks with id=${id}. Maybe BadgeTasks was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BadgeTasks with id=" + id,
      });
    });
};
// Delete all BadgeTaskss from the database.
exports.deleteAll = (req, res) => {
  BadgeTasks.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} BadgeTaskss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all badgeTaskss.",
      });
    });
};


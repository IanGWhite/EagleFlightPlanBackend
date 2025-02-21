const db = require("../models");
const BadgeExperiences = db.badgeExperiences;
const Op = db.Sequelize.Op;
// Create and Save a new BadgeExperiences
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a BadgeExperiences
  const badgeExperiences = {
    // eagleExperienceId: req.params.eagleExperienceId,
    // badgesId: req.params.badgesId,
  };
  // Save BadgeExperiences in the database
  BadgeExperiences.create(badgeExperiences)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BadgeExperiences.",
      });
    });
};
// Retrieve all BadgeExperiencess from the database.
exports.findAll = (req, res) => {
  const badgeExperiencesId = req.query.badgeExperiencesId;
  var condition = badgeExperiencesId
    ? {
        badgeExperiencesId: {
          [Op.like]: `%${badgeExperiencesId}%`,
        },
      }
    : null;

  BadgeExperiences.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving badgeExperiencess.",
      });
    });
};
// Find a single BadgeExperiences with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  BadgeExperiences.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find BadgeExperiences with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving BadgeExperiences with id=" + id,
      });
    });
};
// Update a BadgeExperiences by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  BadgeExperiences.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BadgeExperiences was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update BadgeExperiences with id=${id}. Maybe BadgeExperiences was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating BadgeExperiences with id=" + id,
      });
    });
};
// Delete a BadgeExperiences with the specified id in the request
//todo: update to delete all items owned by badgeExperiences (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  BadgeExperiences.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BadgeExperiences was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete BadgeExperiences with id=${id}. Maybe BadgeExperiences was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BadgeExperiences with id=" + id,
      });
    });
};
// Delete all BadgeExperiencess from the database.
exports.deleteAll = (req, res) => {
  BadgeExperiences.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} BadgeExperiencess were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all badgeExperiencess.",
      });
    });
};


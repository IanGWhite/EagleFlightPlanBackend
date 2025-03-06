const db = require("../models");
const Badges = db.badges;
const Op = db.Sequelize.Op;
// Create and Save a new Badges
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Badges
  const badges = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    points: req.body.points,
    imageLink: req.body.imageLink,
  };
  // Save Badges in the database
  Badges.create(badges)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Badges.",
      });
    });
};
// Retrieve all Badgess from the database.
exports.findAll = (req, res) => {
  const badgesId = req.query.badgesId;
  var condition = badgesId
    ? {
        badgesId: {
          [Op.like]: `%${badgesId}%`,
        },
      }
    : null;

  Badges.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving badgess.",
      });
    });
};
// Find a single Badges with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Badges.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Badges with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Badges with id=" + id,
      });
    });
};
// Update a Badges by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Badges.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Badges was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Badges with id=${id}. Maybe Badges was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Badges with id=" + id,
      });
    });
};
// Delete a Badges with the specified id in the request
//todo: update to delete all items owned by badges (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Badges.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Badges was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Badges with id=${id}. Maybe Badges was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Badges with id=" + id,
      });
    });
};
// Delete all Badgess from the database.
exports.deleteAll = (req, res) => {
  Badges.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Badgess were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all badgess.",
      });
    });
};


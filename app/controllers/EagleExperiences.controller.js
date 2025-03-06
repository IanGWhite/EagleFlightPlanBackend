const db = require("../models");
const EagleExperiences = db.eagleExperiences;
const Op = db.Sequelize.Op;
// Create and Save a new EagleExperiences
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a EagleExperiences
  const eagleExperiences = {
    categoryId: req.body.categoryId,
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
    semesterFromGrad: req.body.semesterFromGrad,
    reflectionReq: req.body.reflectionReq,
  };
  // Save EagleExperiences in the database
  EagleExperiences.create(eagleExperiences)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EagleExperiences.",
      });
    });
};
// Retrieve all EagleExperiencess from the database.
exports.findAll = (req, res) => {
  const eagleExperiencesId = req.query.eagleExperiencesId;
  var condition = eagleExperiencesId
    ? {
        eagleExperiencesId: {
          [Op.like]: `%${eagleExperiencesId}%`,
        },
      }
    : null;

  EagleExperiences.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleExperiencess.",
      });
    });
};
// Find a single EagleExperiences with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EagleExperiences.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EagleExperiences with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EagleExperiences with id=" + id,
      });
    });
};
// Update a EagleExperiences by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EagleExperiences.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleExperiences was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EagleExperiences with id=${id}. Maybe EagleExperiences was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EagleExperiences with id=" + id,
      });
    });
};
// Delete a EagleExperiences with the specified id in the request
//todo: update to delete all items owned by eagleExperiences (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  EagleExperiences.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleExperiences was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EagleExperiences with id=${id}. Maybe EagleExperiences was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EagleExperiences with id=" + id,
      });
    });
};
// Delete all EagleExperiencess from the database.
exports.deleteAll = (req, res) => {
  EagleExperiences.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} EagleExperiencess were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eagleExperiencess.",
      });
    });
};


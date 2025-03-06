const db = require("../models");
const StudentEagleExperiences = db.studentEagleExperiences;
const Op = db.Sequelize.Op;
// Create and Save a new StudentEagleExperiences
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a StudentEagleExperiences
  const studentEagleExperiences = {
    studentId: req.params.studentId,
    eagleExperiencesId: req.params.eagleExperiencesId,
    eagleFlightPlanId: req.params.eagleFlightPlanId,
    pointsAwarded: req.body.pointsAwarded,
    approvedBy: req.body.approvedBy,
    completionDate: req.body.completionDate,
    approvalState: req.body.approvalState,
    reflection: req.body.reflection,
  };
  // Save StudentEagleExperiences in the database
  StudentEagleExperiences.create(studentEagleExperiences)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the StudentEagleExperiences.",
      });
    });
};
// Retrieve all StudentEagleExperiencess from the database.
exports.findAll = (req, res) => {
  const studentEagleExperiencesId = req.query.studentEagleExperiencesId;
  var condition = studentEagleExperiencesId
    ? {
        studentEagleExperiencesId: {
          [Op.like]: `%${studentEagleExperiencesId}%`,
        },
      }
    : null;

  StudentEagleExperiences.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentEagleExperiencess.",
      });
    });
};
// Retrieve all StudentEagleExperiencess for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  StudentEagleExperiences.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentEagleExperiencess.",
      });
    });
};
// Find a single StudentEagleExperiences with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentEagleExperiences.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find StudentEagleExperiences with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving StudentEagleExperiences with id=" + id,
      });
    });
};
// Update a StudentEagleExperiences by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentEagleExperiences.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentEagleExperiences was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update StudentEagleExperiences with id=${id}. Maybe StudentEagleExperiences was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating StudentEagleExperiences with id=" + id,
      });
    });
};
// Delete a StudentEagleExperiences with the specified id in the request
//todo: update to delete all items owned by studentEagleExperiences (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentEagleExperiences.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentEagleExperiences was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete StudentEagleExperiences with id=${id}. Maybe StudentEagleExperiences was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete StudentEagleExperiences with id=" + id,
      });
    });
};
// Delete all StudentEagleExperiencess from the database.
exports.deleteAll = (req, res) => {
  StudentEagleExperiences.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} StudentEagleExperiencess were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all studentEagleExperiencess.",
      });
    });
};


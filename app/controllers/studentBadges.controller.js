const db = require("../models");
const StudentBadges = db.studentBadges;
const Op = db.Sequelize.Op;
// Create and Save a new StudentBadges
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a StudentBadges
  const studentBadges = {
    // studentId: req.params.studentId,
    // badgesId: req.params.badgesId,
  };
  // Save StudentBadges in the database
  StudentBadges.create(studentBadges)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the StudentBadges.",
      });
    });
};
// Retrieve all StudentBadgess from the database.
exports.findAll = (req, res) => {
  const studentBadgesId = req.query.studentBadgesId;
  var condition = studentBadgesId
    ? {
        studentBadgesId: {
          [Op.like]: `%${studentBadgesId}%`,
        },
      }
    : null;

  StudentBadges.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentBadgess.",
      });
    });
};
// Retrieve all StudentBadgess for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  StudentBadges.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentBadgess.",
      });
    });
};
// Find a single StudentBadges with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentBadges.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find StudentBadges with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving StudentBadges with id=" + id,
      });
    });
};
// Update a StudentBadges by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentBadges.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentBadges was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update StudentBadges with id=${id}. Maybe StudentBadges was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating StudentBadges with id=" + id,
      });
    });
};
// Delete a StudentBadges with the specified id in the request
//todo: update to delete all items owned by studentBadges (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentBadges.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentBadges was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete StudentBadges with id=${id}. Maybe StudentBadges was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete StudentBadges with id=" + id,
      });
    });
};
// Delete all StudentBadgess from the database.
exports.deleteAll = (req, res) => {
  StudentBadges.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} StudentBadgess were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all studentBadgess.",
      });
    });
};


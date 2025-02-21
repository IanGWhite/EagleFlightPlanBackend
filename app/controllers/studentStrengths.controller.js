const db = require("../models");
const StudentStrengths = db.studentStrengths;
const Op = db.Sequelize.Op;
// Create and Save a new StudentStrengths
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a StudentStrengths
  const studentStrengths = {
    // studentId: req.params.studentId,
    // badgesId: req.params.badgesId,
  };
  // Save StudentStrengths in the database
  StudentStrengths.create(studentStrengths)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the StudentStrengths.",
      });
    });
};
// Retrieve all StudentStrengthss from the database.
exports.findAll = (req, res) => {
  const studentStrengthsId = req.query.studentStrengthsId;
  var condition = studentStrengthsId
    ? {
        studentStrengthsId: {
          [Op.like]: `%${studentStrengthsId}%`,
        },
      }
    : null;

  StudentStrengths.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentStrengthss.",
      });
    });
};
// Retrieve all StudentStrengthss for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  StudentStrengths.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentStrengthss.",
      });
    });
};
// Find a single StudentStrengths with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentStrengths.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find StudentStrengths with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving StudentStrengths with id=" + id,
      });
    });
};
// Update a StudentStrengths by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentStrengths.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentStrengths was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update StudentStrengths with id=${id}. Maybe StudentStrengths was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating StudentStrengths with id=" + id,
      });
    });
};
// Delete a StudentStrengths with the specified id in the request
//todo: update to delete all items owned by studentStrengths (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentStrengths.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentStrengths was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete StudentStrengths with id=${id}. Maybe StudentStrengths was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete StudentStrengths with id=" + id,
      });
    });
};
// Delete all StudentStrengthss from the database.
exports.deleteAll = (req, res) => {
  StudentStrengths.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} StudentStrengthss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all studentStrengthss.",
      });
    });
};


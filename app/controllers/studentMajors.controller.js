const db = require("../models");
const StudentMajors = db.studentMajors;
const Op = db.Sequelize.Op;
// Create and Save a new StudentMajors
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a StudentMajors
  const studentMajors = {
    // studentId: req.params.studentId,
    // badgesId: req.params.badgesId,
  };
  // Save StudentMajors in the database
  StudentMajors.create(studentMajors)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the StudentMajors.",
      });
    });
};
// Retrieve all StudentMajors from the database.
exports.findAll = (req, res) => {
  const studentMajorsId = req.query.studentMajorsId;
  var condition = studentMajorsId
    ? {
        studentMajorsId: {
          [Op.like]: `%${studentMajorsId}%`,
        },
      }
    : null;

  StudentMajors.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentMajors.",
      });
    });
};
// Retrieve all StudentMajors for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  StudentMajors.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentMajors.",
      });
    });
};
// Find a single StudentMajors with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentMajors.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find StudentMajors with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving StudentMajors with id=" + id,
      });
    });
};
// Update a StudentMajors by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentMajors.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentMajors was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update StudentMajors with id=${id}. Maybe StudentMajors was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating StudentMajors with id=" + id,
      });
    });
};
// Delete a StudentMajors with the specified id in the request
//todo: update to delete all items owned by studentMajors (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentMajors.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentMajors was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete StudentMajors with id=${id}. Maybe StudentMajors was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete StudentMajors with id=" + id,
      });
    });
};
// Delete all StudentMajors from the database.
exports.deleteAll = (req, res) => {
  StudentMajors.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} StudentMajors were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all studentMajors.",
      });
    });
};


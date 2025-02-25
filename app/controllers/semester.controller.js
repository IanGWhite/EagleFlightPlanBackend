const db = require("../models");
const Semester = db.semester;
const Op = db.Sequelize.Op;
// Create and Save a new Semester
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

  // Create a Semester
  const semester = {
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
  };
  // Save Semester in the database
  Semester.create(semester)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Semester.",
      });
    });
};
// Retrieve all Semesters from the database.
exports.findAll = (req, res) => {
  const semesterId = req.query.semesterId;
  var condition = semesterId
    ? {
        semesterId: {
          [Op.like]: `%${semesterId}%`,
        },
      }
    : null;

  Semester.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving semesters.",
      });
    });
};
// Retrieve all Semesters for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Semester.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving semesters.",
      });
    });
};
// Find a single Semester with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Semester.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Semester with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Semester with id=" + id,
      });
    });
};
// Update a Semester by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Semester.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Semester with id=" + id,
      });
    });
};
// Delete a Semester with the specified id in the request
//todo: update to delete all items owned by semester (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Semester.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Semester with id=" + id,
      });
    });
};
// Delete all Semesters from the database.
exports.deleteAll = (req, res) => {
  Semester.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Semesters were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all semesters.",
      });
    });
};


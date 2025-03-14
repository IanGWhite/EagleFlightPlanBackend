const db = require("../models");
const Role = db.role;
const Op = db.Sequelize.Op;
// Create and Save a new Role
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

  // Create a Role
  const role = {
    name: req.body.name,
    canEditPoints: req.body.canEditPoints,
    canAddEvents: req.body.canAddEvents,
    canMarkAttendance: req.body.canMarkAttendance,
  };
  // Save Role in the database
  Role.create(role)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Role.",
      });
    });
};
// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  const roleId = req.query.roleId;
  var condition = roleId
    ? {
        roleId: {
          [Op.like]: `%${roleId}%`,
        },
      }
    : null;

  Role.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};
// Retrieve all Roles for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Role.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};
// Find a single Role with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Role.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Role with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + id,
      });
    });
};
// Update a Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + id,
      });
    });
};
// Delete a Role with the specified id in the request
//todo: update to delete all items owned by role (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id,
      });
    });
};
// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Roles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all roles.",
      });
    });
};


const db = require("../models");
const UserRole = db.userRole;
const Op = db.Sequelize.Op;
// Create and Save a new UserRole
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

  // Create a UserRole
  const userRole = {
    userId: req.params.userId,
    roleId: req.params.roleId
  };
  // Save UserRole in the database
  UserRole.create(userRole)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserRole.",
      });
    });
};
// Retrieve all UserRoles from the database.
exports.findAll = (req, res) => {
  const userRoleId = req.query.userRoleId;
  var condition = userRoleId
    ? {
        userRoleId: {
          [Op.like]: `%${userRoleId}%`,
        },
      }
    : null;

  UserRole.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving userRoles.",
      });
    });
};
// Retrieve all UserRoles for a student from the database.
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;

  UserRole.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving userRoles.",
      });
    });
};
// Find a single UserRole with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  UserRole.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find UserRole with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving UserRole with id=" + id,
      });
    });
};
// Update a UserRole by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  UserRole.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserRole was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update UserRole with id=${id}. Maybe UserRole was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating UserRole with id=" + id,
      });
    });
};
// Delete a UserRole with the specified id in the request
//todo: update to delete all items owned by userRole (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  UserRole.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserRole was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete UserRole with id=${id}. Maybe UserRole was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete UserRole with id=" + id,
      });
    });
};
// Delete all UserRoles from the database.
exports.deleteAll = (req, res) => {
  UserRole.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} UserRoles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userRoles.",
      });
    });
};


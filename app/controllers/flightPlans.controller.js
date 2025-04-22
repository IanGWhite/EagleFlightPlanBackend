const db = require("../models");
const flightPlans = db.flightPlans;
const Op = db.Sequelize.Op;
// Create and Save a new flightPlans
exports.create = (req, res) => {
  //Validate request
  /*
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  */
  // Create a flightPlans
  const flightPlans = {
    semesterId: req.params.semesterId,
  };
  // Save flightPlans in the database
  flightPlans.create(flightPlans)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the flightPlans.",
      });
    });
};
// Retrieve all flightPlanss from the database.
exports.findAll = (req, res) => {
  const flightPlansId = req.query.flightPlansId;
  var condition = flightPlansId
    ? {
        flightPlansId: {
          [Op.like]: `%${flightPlansId}%`,
        },
      }
    : null;

  flightPlans.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving flightPlans.",
      });
    });
};
// Retrieve all flightPlanss for a student from the database.
exports.findAllForSemester = (req, res) => {
  const semesterId = req.params.semesterId;

  flightPlans.findAll({ where: { semesterId: semesterId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving flightPlans.",
      });
    });
};
// Find a single flightPlans with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  flightPlans.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find flightPlans with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving flightPlans with id=" + id,
      });
    });
};
// Update a flightPlans by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  flightPlans.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "flightPlans was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update flightPlans with id=${id}. Maybe flightPlans was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating flightPlans with id=" + id,
      });
    });
};
// Delete a flightPlans with the specified id in the request
//todo: update to delete all items owned by flightPlans (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  flightPlans.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "flightPlans was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete flightPlans with id=${id}. Maybe flightPlans was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete flightPlans with id=" + id,
      });
    });
};
// Delete all flightPlanss from the database.
exports.deleteAll = (req, res) => {
  flightPlans.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} flightPlanss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all flightPlanss.",
      });
    });
};


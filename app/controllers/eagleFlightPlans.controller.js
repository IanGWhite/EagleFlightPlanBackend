const db = require("../models");
const EagleFlightPlan = db.eagleFlightPlans;
const Op = db.Sequelize.Op;
// Create and Save a new EagleFlightPlan
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
  // Create a EagleFlightPlan
  const eagleFlightPlan = {
    studentId: req.params.studentId,
    semesterId: req.params.semesterId,
  };
  // Save EagleFlightPlan in the database
  EagleFlightPlan.create(eagleFlightPlan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EagleFlightPlan.",
      });
    });
};
// Retrieve all EagleFlightPlans from the database.
exports.findAll = (req, res) => {
  const eagleFlightPlanId = req.query.eagleFlightPlanId;
  var condition = eagleFlightPlanId
    ? {
        eagleFlightPlanId: {
          [Op.like]: `%${eagleFlightPlanId}%`,
        },
      }
    : null;

  EagleFlightPlan.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleFlightPlans.",
      });
    });
};
// Retrieve all EagleFlightPlans for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  EagleFlightPlan.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving eagleFlightPlans.",
      });
    });
};
// Find a single EagleFlightPlan with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EagleFlightPlan.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EagleFlightPlan with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving EagleFlightPlan with id=" + id,
      });
    });
};
// Update a EagleFlightPlan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EagleFlightPlan.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleFlightPlan was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update EagleFlightPlan with id=${id}. Maybe EagleFlightPlan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating EagleFlightPlan with id=" + id,
      });
    });
};
// Delete a EagleFlightPlan with the specified id in the request
//todo: update to delete all items owned by eagleFlightPlan (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  EagleFlightPlan.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EagleFlightPlan was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EagleFlightPlan with id=${id}. Maybe EagleFlightPlan was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete EagleFlightPlan with id=" + id,
      });
    });
};
// Delete all EagleFlightPlans from the database.
exports.deleteAll = (req, res) => {
  EagleFlightPlan.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} EagleFlightPlans were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eagleFlightPlans.",
      });
    });
};


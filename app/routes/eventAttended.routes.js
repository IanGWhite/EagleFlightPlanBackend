module.exports = (app) => {
  const eventAttended = require("../controllers/eventAttended.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentStrength for a Student
  //router.post("/:studentId/eventAttended/", [authenticate], eventAttended.create);
  router.post("/:studentId/eventAttended/:eventId", eventAttended.create);


  // Retrieve all StudentStrengths for a student
  router.get(
    "/:studentId/eventAttended/",
    eventAttended.findAllForStudent
  );

  // Retrieve a single StudentStrength with id
  //router.get("/:studentId/eventAttended/:id", [authenticate], eventAttended.findOne);
  router.get("/:studentId/eventAttended/:id", eventAttended.findOne);

  // Update a StudentStrength with id
  router.put("/:studentId/eventAttended/:id", eventAttended.update);

  // Delete a StudentStrength with id
  router.delete("/:studentId/eventAttended/:id", eventAttended.delete);

  // Delete all StudentStrengths
  router.delete("/:studentId/eventAttended/deleteAll", eventAttended.deleteAll);

  app.use("/flight-plan-t5/students", router);
};
  
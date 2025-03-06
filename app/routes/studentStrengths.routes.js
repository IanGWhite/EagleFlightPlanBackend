module.exports = (app) => {
  const studentStrengths = require("../controllers/studentStrengths.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentStrength for a Student
  //router.post("/:studentId/studentStrengths/", [authenticate], studentStrengths.create);
  router.post("/:studentId/studentStrengths/:strengthId", studentStrengths.create);


  // Retrieve all StudentStrengths for a student
  router.get(
    "/:studentId/studentStrengths/",
    studentStrengths.findAllForStudent
  );

  // Retrieve a single StudentStrength with id
  //router.get("/:studentId/studentStrengths/:id", [authenticate], studentStrengths.findOne);
  router.get("/:studentId/studentStrengths/:id", studentStrengths.findOne);

  // Update a StudentStrength with id
  router.put("/:studentId/studentStrengths/:id", studentStrengths.update);

  // Delete a StudentStrength with id
  router.delete("/:studentId/studentStrengths/:id", studentStrengths.delete);

  // Delete all StudentStrengths
  router.delete("/:studentId/studentStrengths/deleteAll", studentStrengths.deleteAll);

  app.use("/flight-plan-t5/students", router);
};

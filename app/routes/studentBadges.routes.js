module.exports = (app) => {
  const studentBadges = require("../controllers/studentBadges.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentBadge for a Student
  //router.post("/:studentId/studentBadges/", [authenticate], studentBadges.create);
  router.post("/:studentId/studentBadges/:badgesId", studentBadges.create);


  // Retrieve all StudentBadges for a student
  router.get(
    "/:studentId/studentBadges/",
    studentBadges.findAllForStudent
  );

  // Retrieve a single StudentBadge with id
  //router.get("/:studentId/studentBadges/:id", [authenticate], studentBadges.findOne);
  router.get("/:studentId/studentBadges/:id", studentBadges.findOne);

  // Update a StudentBadge with id
  router.put("/:studentId/studentBadges/:id", studentBadges.update);

  // Delete a StudentBadge with id
  router.delete("/:studentId/studentBadges/:id", studentBadges.delete);

  // Delete all StudentBadges
  router.delete("/:studentId/studentBadges/deleteAll", studentBadges.deleteAll);

  app.use("/flight-plan-t5/students", router);
};


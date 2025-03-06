module.exports = (app) => {
  const studentEagleExperiences = require("../controllers/studentEagleExperiences.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentEagleExperience for a Student
  //router.post("/:studentId/studentEagleExperiences/", [authenticate], studentEagleExperiences.create);
  router.post("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleExperiences/:eagleExperiencesId", studentEagleExperiences.create);


  // Retrieve all StudentEagleExperiences for a student
  router.get(
    "/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleExperiences/",
    studentEagleExperiences.findAllForStudent
  );

  // Retrieve a single StudentEagleExperience with id
  //router.get("/:studentId/studentEagleExperiences/:id", [authenticate], studentEagleExperiences.findOne);
  router.get("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleExperiences/:id", studentEagleExperiences.findOne);

  // Update a StudentEagleExperience with id
  router.put("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleExperiences/:id", studentEagleExperiences.update);

  // Delete a StudentEagleExperience with id
  router.delete("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleExperiences/:id", studentEagleExperiences.delete);

  // Delete all StudentEagleExperiences
  router.delete("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleExperiences/deleteAll", studentEagleExperiences.deleteAll);

  app.use("/flight-plan-t5/students", router);
};
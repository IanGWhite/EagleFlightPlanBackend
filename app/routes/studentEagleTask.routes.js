module.exports = (app) => {
  const studentEagleTasks = require("../controllers/studentEagleTask.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentEagleTask for a Student
  //router.post("/:studentId/studentEagleTasks/", [authenticate], studentEagleTasks.create);
  router.post("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:eagleTaskId", studentEagleTasks.create);


  // Retrieve all StudentEagleTasks for a student
  router.get(
    "/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/",
    studentEagleTasks.findAllForStudent
  );

  // Retrieve a single StudentEagleTask with id
  //router.get("/:studentId/studentEagleTasks/:id", [authenticate], studentEagleTasks.findOne);
  router.get("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:id", studentEagleTasks.findOne);

  // Update a StudentEagleTask with id
  router.put("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:id", studentEagleTasks.update);

  // Delete a StudentEagleTask with id
  router.delete("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:id", studentEagleTasks.delete);

  // Delete all StudentEagleTasks
  router.delete("/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/deleteAll", studentEagleTasks.deleteAll);

  app.use("/flight-plan-t5/students", router);
};
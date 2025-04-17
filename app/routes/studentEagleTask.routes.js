module.exports = (app) => {
  const studentEagleTasks = require("../controllers/studentEagleTask.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentEagleTask for a Student
  //router.post("/:studentId/studentEagleTasks/", [authenticate], studentEagleTasks.create);
  router.post("/students/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:eagleTaskId", studentEagleTasks.create);


  // Retrieve all StudentEagleTasks for a student
  router.get(
    "/students/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/",
    studentEagleTasks.findAllForStudent
  );

  // Retrieve all StudentEagleTasks
  router.get(
    "/studentEagleTasks/",
    studentEagleTasks.findAll
  );

  // Retrieve a single StudentEagleTask with id
  //router.get("/:studentId/studentEagleTasks/:id", [authenticate], studentEagleTasks.findOne);
  router.get("/students/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:id", studentEagleTasks.findOne);

  // Update a StudentEagleTask with id
  router.put("/students/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:id", studentEagleTasks.update);

  // Delete a StudentEagleTask with id
  router.delete("/students/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/:id", studentEagleTasks.delete);

  // Delete all StudentEagleTasks
  router.delete("/students/:studentId/eagleFlightPlans/:eagleFlightPlanId/studentEagleTasks/deleteAll", studentEagleTasks.deleteAll);

  // Update a StudentEagleTask with id
  router.put("/studentEagleTasks/:id", studentEagleTasks.update);

  app.use("/flight-plan-t5", router);
};
module.exports = (app) => {
  const eagleFlightPlans = require("../controllers/eagleFlightPlans.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new EagleFlightPlan for a Student
  //router.post("/:studentId/eagleFlightPlans/", [authenticate], eagleFlightPlans.create);
  router.post("/:studentId/eagleFlightPlans/:semesterId", eagleFlightPlans.create);


  // Retrieve all EagleFlightPlans for a resume
  router.get(
    "/:studentId/eagleFlightPlans/",
    eagleFlightPlans.findAllForStudent
  );

  // Retrieve a single EagleFlightPlan with id
  //router.get("/:studentId/eagleFlightPlans/:id", [authenticate], eagleFlightPlans.findOne);
  router.get("/:studentId/eagleFlightPlans/:id", eagleFlightPlans.findOne);

  // Update a EagleFlightPlan with id
  router.put("/:studentId/eagleFlightPlans/:id", eagleFlightPlans.update);

  // Delete a EagleFlightPlan with id
  router.delete("/:studentId/eagleFlightPlans/:id", eagleFlightPlans.delete);

  // Delete all EagleFlightPlans
  router.delete("/:studentId/eagleFlightPlans/deleteAll", eagleFlightPlans.deleteAll);

  app.use("/flight-plan-t5/students", router);
}
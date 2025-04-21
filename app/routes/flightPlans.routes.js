module.exports = (app) => {
  const flightPlans = require("../controllers/flightPlans.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new flightPlan
  //router.post("/flightPlans/", [authenticate], flightPlans.create);
  router.post("flightPlans/:semesterId", flightPlans.create);


  // Retrieve all flightPlans
  router.get(
    "/flightPlans/:semesterId",
    flightPlans.findAllForSemester
  );

  // Retrieve a single EagleFlightPlan with id
  //router.get("/flightPlans/:id", [authenticate], flightPlans.findOne);
  router.get("/flightPlans/:id", flightPlans.findOne);

  // Update a EagleFlightPlan with id
  router.put("/flightPlans/:id", flightPlans.update);

  // Delete a EagleFlightPlan with id
  router.delete("/flightPlans/:id", flightPlans.delete);

  // Delete all flightPlans
  router.delete("/flightPlans/deleteAll", flightPlans.deleteAll);

  app.use("/flight-plan-t5", router);
}
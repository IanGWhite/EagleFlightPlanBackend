module.exports = (app) => {
  const badgeEvents = require("../controllers/badgeEvents.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new badgeEvent for a badge
  //router.post("/:/badgeEvents/", [authenticate], badgeEvents.create);
  router.post("/:badgesId/badgeEvents/:eventId", badgeEvents.create);

  // Retrieve all badgeEvents for a badge
  router.get(
    "/:badgesId/badgeEvents/",
    badgeEvents.findAll
  );

  // Retrieve a single badgeEvent with id
  //router.get("/:/badgeEvents/:id", [authenticate], badgeEvents.findOne);
  router.get("/:badgesId/badgeEvents/:id", badgeEvents.findOne);

  // Update a badgeEvent with id
  router.put("/:badgesId/badgeEvents/:id", badgeEvents.update);

  // Delete a badgeEvent with id
  router.delete("/:badgesId/badgeEvents/:id", badgeEvents.delete);

  // Delete all badgeEvents
  router.delete("/:badgesId/badgeEvents/deleteAll", badgeEvents.deleteAll);

  app.use("/flight-plan-t5/badges", router);
};

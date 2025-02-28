module.exports = (app) => {
  const badgeTasks = require("../controllers/badgeTasks.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new badgeTask for a badge
  //router.post("/:/badgeTasks/", [authenticate], badgeTasks.create);
  router.post("/:badgesId/badgeTasks/:eagleTaskId", badgeTasks.create);

  // Retrieve all badgeTasks for a badge
  router.get(
    "/:badgesId/badgeTasks/",
    badgeTasks.findAll
  );

  // Retrieve a single badgeTask with id
  //router.get("/:/badgeTasks/:id", [authenticate], badgeTasks.findOne);
  router.get("/:badgesId/badgeTasks/:id", badgeTasks.findOne);

  // Update a badgeTask with id
  router.put("/:badgesId/badgeTasks/:id", badgeTasks.update);

  // Delete a badgeTask with id
  router.delete("/:badgesId/badgeTasks/:id", badgeTasks.delete);

  // Delete all badgeTasks
  router.delete("/:badgesId/badgeTasks/deleteAll", badgeTasks.deleteAll);

  app.use("/flight-plan-t5/badges", router);
};

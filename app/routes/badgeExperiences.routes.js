module.exports = (app) => {
  const badgeExperiences = require("../controllers/badgeExperiences.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new badgeExperience for a badge
  //router.post("/:/badgeExperiences/", [authenticate], badgeExperiences.create);
  router.post("/:badgesId/badgeExperiences/:eagleExperienceId", badgeExperiences.create);

  // Retrieve all badgeExperiences for a badge
  router.get(
    "/:badgesId/badgeExperiences/",
    badgeExperiences.findAll
  );

  // Retrieve a single badgeExperience with id
  //router.get("/:/badgeExperiences/:id", [authenticate], badgeExperiences.findOne);
  router.get("/:badgesId/badgeExperiences/:id", badgeExperiences.findOne);

  // Update a badgeExperience with id
  router.put("/:badgesId/badgeExperiences/:id", badgeExperiences.update);

  // Delete a badgeExperience with id
  router.delete("/:badgesId/badgeExperiences/:id", badgeExperiences.delete);

  // Delete all badgeExperiences
  router.delete("/:badgesId/badgeExperiences/deleteAll", badgeExperiences.deleteAll);

  app.use("/flight-plan-t5/badges", router);
};


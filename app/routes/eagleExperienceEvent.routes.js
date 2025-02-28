module.exports = (app) => {
  const eagleExperienceEvents = require("../controllers/eagleExperienceEvent.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new eagleExperienceEvent for a Experience
  //router.post("/:eagleExperiencesId/eagleExperienceEvents/", [authenticate], eagleExperienceEvents.create);
  router.post("/:eagleExperiencesId/eagleExperienceEvents/:eventId", eagleExperienceEvents.create);

  // Retrieve a single eagleExperienceEvent with id
  //router.get("/:eagleExperiencesId/eagleExperienceEvents/:id", [authenticate], eagleExperienceEvents.findOne);
  router.get("/:eagleExperiencesId/eagleExperienceEvents/:id", eagleExperienceEvents.findOne);

  // Update a eagleExperienceEvent with id
  router.put("/:eagleExperiencesId/eagleExperienceEvents/:id", eagleExperienceEvents.update);

  // Delete a eagleExperienceEvent with id
  router.delete("/:eagleExperiencesId/eagleExperienceEvents/:id", eagleExperienceEvents.delete);

  // Delete all eagleExperienceEvents
  router.delete("/:eagleExperiencesId/eagleExperienceEvents/deleteAll", eagleExperienceEvents.deleteAll);

  app.use("/flight-plan-t5/eagleExperiences", router);
}
  
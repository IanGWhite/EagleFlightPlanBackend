module.exports = (app) => {
  const eagleExperienceMajors = require("../controllers/eagleExperienceMajors.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new eagleExperienceMajor for a Experience
  //router.post("/:eagleExperiencesId/eagleExperienceMajors/", [authenticate], eagleExperienceMajors.create);
  router.post("/:eagleExperiencesId/eagleExperienceMajors/:majorId", eagleExperienceMajors.create);

  // Retrieve a single eagleExperienceMajor with id
  //router.get("/:eagleExperiencesId/eagleExperienceMajors/:id", [authenticate], eagleExperienceMajors.findOne);
  router.get("/:eagleExperiencesId/eagleExperienceMajors/:id", eagleExperienceMajors.findOne);

  // Update a eagleExperienceMajor with id
  router.put("/:eagleExperiencesId/eagleExperienceMajors/:id", eagleExperienceMajors.update);

  // Delete a eagleExperienceMajor with id
  router.delete("/:eagleExperiencesId/eagleExperienceMajors/:id", eagleExperienceMajors.delete);

  // Delete all eagleExperienceMajors
  router.delete("/:eagleExperiencesId/eagleExperienceMajors/deleteAll", eagleExperienceMajors.deleteAll);

  app.use("/flight-plan-t5/eagleExperiences", router);
}
  
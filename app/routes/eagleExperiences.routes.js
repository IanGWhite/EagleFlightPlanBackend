module.exports = (app) => {
  const eagleExperiences = require("../controllers/eagleExperiences.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new EagleExperiences
  router.post("/", eagleExperiences.create);

  // Retrieve all EagleExperiences
  router.get("/", eagleExperiences.findAll);

  // Retrieve a single EagleExperiences with id
  router.get("/:id",eagleExperiences.findOne);

  // Update a EagleExperiences with id
  router.put("/:id", eagleExperiences.update);

  // Delete a EagleExperiences with id
  router.delete("/:id",eagleExperiences.delete);

  // Delete all EagleExperiences
  router.delete("/", eagleExperiences.deleteAll);

  app.use("/flight-plan-t5/eagleExperiences", router);
};

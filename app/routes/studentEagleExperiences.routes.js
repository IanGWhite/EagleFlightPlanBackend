module.exports = (app) => {
  const studentEagleExperiences = require("../controllers/studentEagleExperiences.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentEagleExperiences
  router.post("/", studentEagleExperiences.create);

  // Retrieve all People
  router.get("/", studentEagleExperiences.findAll);

  // Retrieve a single StudentEagleExperiences with id
  router.get("/:id",studentEagleExperiences.findOne);

  // Update a StudentEagleExperiences with id
  router.put("/:id", studentEagleExperiences.update);

  // Delete a StudentEagleExperiences with id
  router.delete("/:id",studentEagleExperiences.delete);

  // Delete all StudentEagleExperiences
  router.delete("/", studentEagleExperiences.deleteAll);

  app.use("/flight-plan-t5/studentEagleExperiences", router);
};

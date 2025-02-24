module.exports = (app) => {
  const badgeExperiences = require("../controllers/badgeExperiences.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new BadgeExperiences
  router.post("/", badgeExperiences.create);

  // Retrieve all BadgeExperiences
  router.get("/", badgeExperiences.findAll);

  // Retrieve a single BadgeExperiences with id
  router.get("/:id",badgeExperiences.findOne);

  // Update a BadgeExperiences with id
  router.put("/:id", badgeExperiences.update);

  // Delete a BadgeExperiences with id
  router.delete("/:id",badgeExperiences.delete);

  // Delete all BadgeExperiences
  router.delete("/", badgeExperiences.deleteAll);

  app.use("/flight-plan-t5/badgeExperiences", router);
};

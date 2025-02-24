module.exports = (app) => {
  const badges = require("../controllers/badges.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Badges
  router.post("/", badges.create);

  // Retrieve all Badges
  router.get("/", badges.findAll);

  // Retrieve a single Badges with id
  router.get("/:id",badges.findOne);

  // Update a Badges with id
  router.put("/:id", badges.update);

  // Delete a Badges with id
  router.delete("/:id",badges.delete);

  // Delete all Badges
  router.delete("/", badges.deleteAll);

  app.use("/flight-plan-t5/badges", router);
};

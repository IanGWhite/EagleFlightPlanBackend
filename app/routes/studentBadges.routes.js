module.exports = (app) => {
  const studentBadges = require("../controllers/studentBadges.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentBadges
  router.post("/", studentBadges.create);

  // Retrieve all StudentBadges
  router.get("/", studentBadges.findAll);

  // Retrieve a single StudentBadges with id
  router.get("/:id",studentBadges.findOne);

  // Update a StudentBadges with id
  router.put("/:id", studentBadges.update);

  // Delete a StudentBadges with id
  router.delete("/:id",studentBadges.delete);

  // Delete all StudentBadges
  router.delete("/", studentBadges.deleteAll);

  app.use("/flight-plan-t5/studentBadges", router);
};

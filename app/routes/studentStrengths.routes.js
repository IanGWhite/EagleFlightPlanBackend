module.exports = (app) => {
  const studentStrengths = require("../controllers/studentStrengths.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentStrengths
  router.post("/", studentStrengths.create);

  // Retrieve all StudentStrengths
  router.get("/", studentStrengths.findAll);

  // Retrieve a single StudentStrengths with id
  router.get("/:id",studentStrengths.findOne);

  // Update a StudentStrengths with id
  router.put("/:id", studentStrengths.update);

  // Delete a StudentStrengths with id
  router.delete("/:id",studentStrengths.delete);

  // Delete all StudentStrengths
  router.delete("/", studentStrengths.deleteAll);

  app.use("/flight-plan-t5/studentStrengths", router);
};

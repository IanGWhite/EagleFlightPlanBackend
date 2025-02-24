module.exports = (app) => {
  const badgeTasks = require("../controllers/badgeTasks.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new BadgeTasks
  router.post("/", badgeTasks.create);

  // Retrieve all BadgeTasks
  router.get("/", badgeTasks.findAll);

  // Retrieve a single BadgeTasks with id
  router.get("/:id",badgeTasks.findOne);

  // Update a BadgeTasks with id
  router.put("/:id", badgeTasks.update);

  // Delete a BadgeTasks with id
  router.delete("/:id",badgeTasks.delete);

  // Delete all BadgeTasks
  router.delete("/", badgeTasks.deleteAll);

  app.use("/flight-plan-t5/badgeTasks", router);
};

module.exports = (app) => {
  const badgeEvents = require("../controllers/badgeEvents.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new BadgeEvents
  router.post("/", badgeEvents.create);

  // Retrieve all BadgeEvents
  router.get("/", badgeEvents.findAll);

  // Retrieve a single BadgeEvents with id
  router.get("/:id",badgeEvents.findOne);

  // Update a BadgeEvents with id
  router.put("/:id", badgeEvents.update);

  // Delete a BadgeEvents with id
  router.delete("/:id",badgeEvents.delete);

  // Delete all BadgeEvents
  router.delete("/", badgeEvents.deleteAll);

  app.use("/flight-plan-t5/badgeEvents", router);
};

module.exports = (app) => {
  const studentMajors = require("../controllers/studentMajors.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentMajors
  router.post("/", studentMajors.create);

  // Retrieve all StudentMajors
  router.get("/", studentMajors.findAll);

  // Retrieve a single StudentMajors with id
  router.get("/:id",studentMajors.findOne);

  // Update a StudentMajors with id
  router.put("/:id", studentMajors.update);

  // Delete a StudentMajors with id
  router.delete("/:id",studentMajors.delete);

  // Delete all StudentMajors
  router.delete("/", studentMajors.deleteAll);

  app.use("/flight-plan-t5/studentMajors", router);
};

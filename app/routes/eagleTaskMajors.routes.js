module.exports = (app) => {
  const eagleTaskMajors = require("../controllers/eagleTaskMajors.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new eagleTaskMajor for a Task
  //router.post("/:eagleTasksId/eagleTaskMajors/", [authenticate], eagleTaskMajors.create);
  router.post("/:eagleTaskId/eagleTaskMajors/:majorId", eagleTaskMajors.create);

  // Retrieve a single eagleTaskMajor with id
  //router.get("/:eagleTasksId/eagleTaskMajors/:id", [authenticate], eagleTaskMajors.findOne);
  router.get("/:eagleTaskId/eagleTaskMajors/:id", eagleTaskMajors.findOne);

  // Update a eagleTaskMajor with id
  router.put("/:eagleTaskId/eagleTaskMajors/:id", eagleTaskMajors.update);

  // Delete a eagleTaskMajor with id
  router.delete("/:eagleTaskId/eagleTaskMajors/:id", eagleTaskMajors.delete);

  // Delete all eagleTaskMajors
  router.delete("/:eagleTaskId/eagleTaskMajors/deleteAll", eagleTaskMajors.deleteAll);

  app.use("/flight-plan-t5/eagleTask", router);
}
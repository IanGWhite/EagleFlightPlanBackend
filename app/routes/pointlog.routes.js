module.exports = (app) => {
    const pointLogs = require("../controllers/pointLog.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new PointLog for a Student
    //router.post("/:studentId/pointLogs/", [authenticate], pointLogs.create);
    router.post("/:studentId/pointLogs/", pointLogs.create);

    // Create a new PointLog for a Student with shop item
    router.post("/:studentId/pointLogs/:shopItemId", pointLogs.create);
  
    // Retrieve all PointLogs for a Student
    router.get(
      "/:studentId/pointLogs/",
      pointLogs.findAll
    );
  
    // Retrieve a single PointLog with id
    //router.get("/:studentId/pointLogs/:id", [authenticate], pointLogs.findOne);
    router.get("/:studentId/pointLogs/:id", pointLogs.findOne);
  
    // Update a PointLog with id
    router.put("/:studentId/pointLogs/:id", pointLogs.update);
  
    // Delete a PointLog with id
    router.delete("/:studentId/pointLogs/:id", pointLogs.delete);
  
    // Delete all PointLogs
    router.delete("/:studentId/pointLogs/deleteAll", pointLogs.deleteAll);
  
    app.use("/flight-plan-t5/students", router);
  };
  
module.exports = (app) => {
    const eagleTasks = require("../controllers/eagleTask.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new EagleTask for a Student
    //router.post("/:studentId/eagleTasks/", [authenticate], eagleTasks.create);
    router.post("/eagleTasks/", eagleTasks.create);
  
    // Retrieve all EagleTasks for a Student
    router.get(
      "/eagleTasks/",
      eagleTasks.findAll
    );
  
    // Retrieve a single EagleTask with id
    //router.get("/:studentId/eagleTasks/:id", [authenticate], eagleTasks.findOne);
    router.get("/eagleTasks/:id", eagleTasks.findOne);
  
    // Update a EagleTask with id
    router.put("/eagleTasks/:id", eagleTasks.update);
  
    // Delete a EagleTask with id
    router.delete("/eagleTasks/:id", eagleTasks.delete);
  
    // Delete all EagleTasks
    router.delete("/eagleTasks/deleteAll", eagleTasks.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
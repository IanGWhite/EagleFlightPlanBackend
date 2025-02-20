module.exports = (app) => {
    const studentEagleTasks = require("../controllers/studentEagleTask.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new StudentEagleTask for a Student
    //router.post("/:studentId/studentEagleTasks/", [authenticate], studentEagleTasks.create);
    router.post("/studentEagleTasks/", studentEagleTasks.create);
  
    // Retrieve all StudentEagleTasks for a Student
    router.get(
      "/studentEagleTasks/",
      studentEagleTasks.findAll
    );
  
    // Retrieve a single StudentEagleTask with id
    //router.get("/:studentId/studentEagleTasks/:id", [authenticate], studentEagleTasks.findOne);
    router.get("/studentEagleTasks/:id", studentEagleTasks.findOne);
  
    // Update a StudentEagleTask with id
    router.put("/studentEagleTasks/:id", studentEagleTasks.update);
  
    // Delete a StudentEagleTask with id
    router.delete("/studentEagleTasks/:id", studentEagleTasks.delete);
  
    // Delete all StudentEagleTasks
    router.delete("/studentEagleTasks/deleteAll", studentEagleTasks.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
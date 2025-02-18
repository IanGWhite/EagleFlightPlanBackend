module.exports = (app) => {
    const studentTasks = require("../controllers/studentTask.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new StudentTask for a Student
    //router.post("/:studentId/studentTasks/", [authenticate], studentTasks.create);
    router.post("/studentTasks/", studentTasks.create);
  
    // Retrieve all StudentTasks for a Student
    router.get(
      "/studentTasks/",
      studentTasks.findAll
    );
  
    // Retrieve a single StudentTask with id
    //router.get("/:studentId/studentTasks/:id", [authenticate], studentTasks.findOne);
    router.get("/studentTasks/:id", studentTasks.findOne);
  
    // Update a StudentTask with id
    router.put("/studentTasks/:id", studentTasks.update);
  
    // Delete a StudentTask with id
    router.delete("/studentTasks/:id", studentTasks.delete);
  
    // Delete all StudentTasks
    router.delete("/studentTasks/deleteAll", studentTasks.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
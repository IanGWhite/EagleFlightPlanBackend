module.exports = (app) => { 
    const eagleTaskMajors = require("../controllers/eagleTaskMajors.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new EagleTaskMajor for a Student
    //router.post("/:studentId/eagleTaskMajors/", [authenticate], eagleTaskMajors.create);
    router.post("/eagleTaskMajors/", eagleTaskMajors.create);
  
    // Retrieve all EagleTaskMajors for a Student
    router.get(
      "/eagleTaskMajors/",
      eagleTaskMajors.findAll
    );
  
    // Retrieve a single EagleTaskMajor with id
    //router.get("/:studentId/eagleTaskMajors/:id", [authenticate], eagleTaskMajors.findOne);
    router.get("/eagleTaskMajors/:id", eagleTaskMajors.findOne);
  
    // Update a EagleTaskMajor with id
    router.put("/eagleTaskMajors/:id", eagleTaskMajors.update);
  
    // Delete a EagleTaskMajor with id
    router.delete("/eagleTaskMajors/:id", eagleTaskMajors.delete);
  
    // Delete all EagleTaskMajors
    router.delete("/eagleTaskMajors/deleteAll", eagleTaskMajors.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
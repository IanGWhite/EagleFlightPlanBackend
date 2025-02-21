module.exports = (app) => {
    const eventAttended = require("../controllers/eventAttended.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new EventAttended for a Student
    //router.post("/:studentId/eventAttended/", [authenticate], eventAttended.create);
    router.post("/:studentId/eventAttended/", eventAttended.create);
  
    // Retrieve all EventsAttended for a Student
    router.get(
      "/:studentId/eventAttended/",
      eventAttended.findAllForStudent
    );
  
    // Retrieve a single EventAttended with id
    //router.get("/:studentId/eventAttended/:id", [authenticate], eventAttended.findOne);
    router.get("/:studentId/eventAttended/:id", eventAttended.findOne);
  
    // Update a EventAttended with id
    router.put("/:studentId/eventAttended/:id", eventAttended.update);
  
    // Delete a EventAttended with id
    router.delete("/:studentId/eventAttended/:id", eventAttended.delete);
  
    // Delete all EventsAttended
    router.delete("/:studentId/eventAttended/deleteAll", eventAttended.deleteAll);
  
    app.use("/flight-plan-t5/students", router);
  };
  
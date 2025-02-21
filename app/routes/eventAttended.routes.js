module.exports = (app) => {
    const eventAttended = require("../controllers/eventAttended.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new EventAttended for a Student
    //router.post("/:/eventAttended/", [authenticate], eventAttended.create);
    router.post("/eventAttended/", eventAttended.create);
  
    // Retrieve all EventsAttended for a Student
    router.get(
      "/eventAttended/",
      eventAttended.findAll
    );
  
    // Retrieve a single EventAttended with id
    //router.get("/:/eventAttended/:id", [authenticate], eventAttended.findOne);
    router.get("/eventAttended/:id", eventAttended.findOne);
  
    // Update a EventAttended with id
    router.put("/eventAttended/:id", eventAttended.update);
  
    // Delete a EventAttended with id
    router.delete("/eventAttended/:id", eventAttended.delete);
  
    // Delete all EventsAttended
    router.delete("/eventAttended/deleteAll", eventAttended.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
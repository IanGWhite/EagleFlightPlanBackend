module.exports = (app) => {
    const events = require("../controllers/event.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Event for a Student
    //router.post("/:studentId/events/", [authenticate], events.create);
    router.post("/events/", events.create);
  
    // Retrieve all Events for a Student
    router.get(
      "/events/",
      events.findAll
    );
  
    // Retrieve a single Event with id
    //router.get("/:studentId/events/:id", [authenticate], events.findOne);
    router.get("/events/:id", events.findOne);
  
    // Update a Event with id
    router.put("/events/:id", events.update);
  
    // Delete a Event with id
    router.delete("/events/:id", events.delete);
  
    // Delete all Events
    router.delete("/events/deleteAll", events.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
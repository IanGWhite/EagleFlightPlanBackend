module.exports = (app) => {
    const eagleExperienceEvents = require("../controllers/eagleExperienceEvent.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new EagleExperienceEvent for a Student
    //router.post("/:studentId/eagleExperienceEvents/", [authenticate], eagleExperienceEvents.create);
    router.post("/eagleExperienceEvents/", eagleExperienceEvents.create);
  
    // Retrieve all EagleExperienceEvents for a Student
    router.get(
      "/eagleExperienceEvents/",
      eagleExperienceEvents.findAll
    );
  
    // Retrieve a single EagleExperienceEvent with id
    //router.get("/:studentId/eagleExperienceEvents/:id", [authenticate], eagleExperienceEvents.findOne);
    router.get("/eagleExperienceEvents/:id", eagleExperienceEvents.findOne);
  
    // Update a EagleExperienceEvent with id
    router.put("/eagleExperienceEvents/:id", eagleExperienceEvents.update);
  
    // Delete a EagleExperienceEvent with id
    router.delete("/eagleExperienceEvents/:id", eagleExperienceEvents.delete);
  
    // Delete all EagleExperienceEvents
    router.delete("/eagleExperienceEvents/deleteAll", eagleExperienceEvents.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
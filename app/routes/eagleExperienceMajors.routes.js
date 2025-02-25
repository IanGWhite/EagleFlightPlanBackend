module.exports = (app) => { 
    const eagleExperienceMajors = require("../controllers/eagleExperienceMajors.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new EagleExperienceMajor for a Student
    //router.post("/:studentId/eagleExperienceMajors/", [authenticate], eagleExperienceMajors.create);
    router.post("/eagleExperienceMajors/", eagleExperienceMajors.create);
  
    // Retrieve all EagleExperienceMajors for a Student
    router.get(
      "/eagleExperienceMajors/",
      eagleExperienceMajors.findAll
    );
  
    // Retrieve a single EagleExperienceMajor with id
    //router.get("/:studentId/eagleExperienceMajors/:id", [authenticate], eagleExperienceMajors.findOne);
    router.get("/eagleExperienceMajors/:id", eagleExperienceMajors.findOne);
  
    // Update a EagleExperienceMajor with id
    router.put("/eagleExperienceMajors/:id", eagleExperienceMajors.update);
  
    // Delete a EagleExperienceMajor with id
    router.delete("/eagleExperienceMajors/:id", eagleExperienceMajors.delete);
  
    // Delete all EagleExperienceMajors
    router.delete("/eagleExperienceMajors/deleteAll", eagleExperienceMajors.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
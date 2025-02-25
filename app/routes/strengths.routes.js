module.exports = (app) => { 
    const strengths = require("../controllers/strengths.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Strength for a Student
    //router.post("/:studentId/strengths/", [authenticate], strengths.create);
    router.post("/strengths/", strengths.create);
  
    // Retrieve all Strengths for a Student
    router.get(
      "/strengths/",
      strengths.findAll
    );
  
    // Retrieve a single Strength with id
    //router.get("/:studentId/strengths/:id", [authenticate], strengths.findOne);
    router.get("/strengths/:id", strengths.findOne);
  
    // Update a Strength with id
    router.put("/strengths/:id", strengths.update);
  
    // Delete a Strength with id
    router.delete("/strengths/:id", strengths.delete);
  
    // Delete all Strengths
    router.delete("/strengths/deleteAll", strengths.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
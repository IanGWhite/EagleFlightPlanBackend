module.exports = (app) => { 
    const majors = require("../controllers/majors.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Major for a Student
    //router.post("/:studentId/majors/", [authenticate], majors.create);
    router.post("/majors/", majors.create);
  
    // Retrieve all Majors for a Student
    router.get(
      "/majors/",
      majors.findAll
    );
  
    // Retrieve a single Major with id
    //router.get("/:studentId/majors/:id", [authenticate], majors.findOne);
    router.get("/majors/:id", majors.findOne);
  
    // Update a Major with id
    router.put("/majors/:id", majors.update);
  
    // Delete a Major with id
    router.delete("/majors/:id", majors.delete);
  
    // Delete all Majors
    router.delete("/majors/deleteAll", majors.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
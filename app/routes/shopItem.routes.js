module.exports = (app) => {
    const semesters = require("../controllers/semester.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Award for a Student
    //router.post("/:studentId/semesters/", [authenticate], semesters.create);
    router.post("/semesters/", semesters.create);
  
    // Retrieve all Awards for a Student
    router.get(
      "/semesters/",
      semesters.findAll
    );
  
    // Retrieve a single Award with id
    //router.get("/:studentId/semesters/:id", [authenticate], semesters.findOne);
    router.get("/semesters/:id", semesters.findOne);
  
    // Update a Award with id
    router.put("/semesters/:id", semesters.update);
  
    // Delete a Award with id
    router.delete("/semesters/:id", semesters.delete);
  
    // Delete all Awards
    router.delete("/semesters/deleteAll", semesters.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
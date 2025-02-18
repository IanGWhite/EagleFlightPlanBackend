module.exports = (app) => {
    const semesters = require("../controllers/semester.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Semester for a Student
    //router.post("/:studentId/semesters/", [authenticate], semesters.create);
    router.post("/semesters/", semesters.create);
  
    // Retrieve all Semesters for a Student
    router.get(
      "/semesters/",
      semesters.findAllForStudent
    );
  
    // Retrieve a single Semester with id
    //router.get("/:studentId/semesters/:id", [authenticate], semesters.findOne);
    router.get("/semesters/:id", semesters.findOne);
  
    // Update a Semester with id
    router.put("/semesters/:id", semesters.update);
  
    // Delete a Semester with id
    router.delete("/semesters/:id", semesters.delete);
  
    // Delete all Semesters
    router.delete("/semesters/deleteAll", semesters.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
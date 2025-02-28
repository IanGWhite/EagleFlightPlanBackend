module.exports = (app) => {
  const studentMajors = require("../controllers/studentMajors.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentMajor for a Student
  //router.post("/:studentId/studentMajors/", [authenticate], studentMajors.create);
  router.post("/:studentId/studentMajors/:majorId", studentMajors.create);


  // Retrieve all StudentMajors for a student
  router.get(
    "/:studentId/studentMajors/",
    studentMajors.findAllForStudent
  );

  // Retrieve a single StudentMajor with id
  //router.get("/:studentId/studentMajors/:id", [authenticate], studentMajors.findOne);
  router.get("/:studentId/studentMajors/:id", studentMajors.findOne);

  // Update a StudentMajor with id
  router.put("/:studentId/studentMajors/:id", studentMajors.update);

  // Delete a StudentMajor with id
  router.delete("/:studentId/studentMajors/:id", studentMajors.delete);

  // Delete all StudentMajors
  router.delete("/:studentId/studentMajors/deleteAll", studentMajors.deleteAll);

  app.use("/flight-plan-t5/students", router);
};

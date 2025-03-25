module.exports = (app) => {
  const students = require("../controllers/student.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Student
  router.post("/:userId", students.create);

  // find all students
  router.get("/", students.findAll);

  // Retrieve Student for user
  router.get("/userStudent/:userId", students.findAllForUser);

  // Retrieve a single Student with id
  router.get("/:id", students.findOne);

  // Update a Student with id
  router.put("/:id", students.update);

  // Delete a Student with id
  router.delete("/:id", students.delete);

  app.use("/flight-plan-t5/students", router);
};

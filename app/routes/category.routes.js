module.exports = (app) => {
    const category = require("../controllers/category.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Category for a Student
    //router.post("/:studentId/category/", [authenticate], category.create);
    router.post("/category/", category.create);
  
    // Retrieve all Category for a Student
    router.get(
      "/category/",
      category.findAll
    );
  
    // Retrieve a single Category with id
    //router.get("/:studentId/category/:id", [authenticate], category.findOne);
    router.get("/category/:id", category.findOne);
  
    // Update a Category with id
    router.put("/category/:id", category.update);
  
    // Delete a Category with id
    router.delete("/category/:id", category.delete);
  
    // Delete all Category
    router.delete("/category/deleteAll", category.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
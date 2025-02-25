module.exports = (app) => {
    const roles = require("../controllers/role.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Roles for a Student
    //router.post("/:studentId/roles/", [authenticate], roles.create);
    router.post("/roles/", roles.create);
  
    // Retrieve all Roles for a Student
    router.get(
      "/roles/",
      roles.findAll
    );
  
    // Retrieve a single Role with id
    //router.get("/:studentId/roles/:id", [authenticate], roles.findOne);
    router.get("/roles/:id", roles.findOne);
  
    // Update a Role with id
    router.put("/roles/:id", roles.update);
  
    // Delete a Role with id
    router.delete("/roles/:id", roles.delete);
  
    // Delete all Roles
    router.delete("/roles/deleteAll", roles.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
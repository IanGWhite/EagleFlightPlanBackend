module.exports = (app) => {
    const userRoles = require("../controllers/userRole.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new UserRole for a Student
    //router.post("/:studentId/userRoles/", [authenticate], userRoles.create);
    router.post("/:userId/userRoles/", userRoles.create);
  
    // Retrieve all UserRoles for a Student
    router.get(
      "/:userId/userRoles/",
      userRoles.findAllForUser
    );
  
    // Retrieve a single UserRole with id
    //router.get("/:studentId/userRoles/:id", [authenticate], userRoles.findOne);
    router.get("/:userId/userRoles/:id", userRoles.findOne);
  
    // Update a UserRole with id
    router.put("/:userId/userRoles/:id", userRoles.update);
  
    // Delete a UserRole with id
    router.delete("/:userId/userRoles/:id", userRoles.delete);
  
    // Delete all UserRoles
    router.delete("/:userId/userRoles/deleteAll", userRoles.deleteAll);
  
    app.use("/flight-plan-t5/users", router);
  };
  
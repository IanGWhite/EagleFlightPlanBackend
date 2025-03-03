module.exports = (app) => {
  const userRoles = require("../controllers/userRole.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new StudentBadge for a Student
  //router.post("/:userId/userRoles/", [authenticate], userRoles.create);
  router.post("/:userId/userRoles/:roleId", userRoles.create);


  // Retrieve all StudentBadges for a user
  router.get(
    "/:userId/userRoles/",
    userRoles.findAllForUser
  );

  // Retrieve a single StudentBadge with id
  //router.get("/:userId/userRoles/:id", [authenticate], userRoles.findOne);
  router.get("/:userId/userRoles/:id", userRoles.findOne);

  // Update a StudentBadge with id
  router.put("/:userId/userRoles/:id", userRoles.update);

  // Delete a StudentBadge with id
  router.delete("/:userId/userRoles/:id", userRoles.delete);

  // Delete all StudentBadges
  router.delete("/:userId/userRoles/deleteAll", userRoles.deleteAll);

  app.use("/flight-plan-t5/users", router);
};


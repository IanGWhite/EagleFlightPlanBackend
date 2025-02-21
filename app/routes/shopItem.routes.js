module.exports = (app) => {
    const shopItems = require("../controllers/shopItem.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Award for a Student
    //router.post("/:studentId/shopItems/", [authenticate], shopItems.create);
    router.post("/shopItems/", shopItems.create);
  
    // Retrieve all Awards for a Student
    router.get(
      "/shopItems/",
      shopItems.findAll
    );
  
    // Retrieve a single Award with id
    //router.get("/:studentId/shopItems/:id", [authenticate], shopItems.findOne);
    router.get("/shopItems/:id", shopItems.findOne);
  
    // Update a Award with id
    router.put("/shopItems/:id", shopItems.update);
  
    // Delete a Award with id
    router.delete("/shopItems/:id", shopItems.delete);
  
    // Delete all Awards
    router.delete("/shopItems/deleteAll", shopItems.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
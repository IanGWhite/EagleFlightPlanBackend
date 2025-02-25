module.exports = (app) => {
    const documents = require("../controllers/document.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Document for a Student
    //router.post("/:/documents/", [authenticate], documents.create);
    router.post("/documents/", documents.create);
  
    // Retrieve all Documents for a Student
    router.get(
      "/documents/",
      documents.findAll
    );
  
    // Retrieve a single Document with id
    //router.get("/:/documents/:id", [authenticate], documents.findOne);
    router.get("/documents/:id", documents.findOne);
  
    // Update a Document with id
    router.put("/documents/:id", documents.update);
  
    // Delete a Document with id
    router.delete("/documents/:id", documents.delete);
  
    // Delete all Documents
    router.delete("/documents/deleteAll", documents.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
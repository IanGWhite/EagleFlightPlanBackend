module.exports = (app) => {
    const documents = require("../controllers/document.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Document for a Student
    //router.post("/:studentId/documents/", [authenticate], documents.create);
    router.post("/:studentId/documents/", documents.create);
  
    // Retrieve all Documents for a Student
    router.get(
      "/:studentId/documents/",
      documents.findAllForStudent
    );
  
    // Retrieve a single Document with id
    //router.get("/:studentId/documents/:id", [authenticate], documents.findOne);
    router.get("/:studentId/documents/:id", documents.findOne);
  
    // Update a Document with id
    router.put("/:studentId/documents/:id", documents.update);
  
    // Delete a Document with id
    router.delete("/:studentId/documents/:id", documents.delete);
  
    // Delete all Documents
    router.delete("/:studentId/documents/deleteAll", documents.deleteAll);
  
    app.use("/flight-plan-t5/students", router);
  };
  
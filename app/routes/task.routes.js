module.exports = (app) => {
    const tasks = require("../controllers/task.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Task for a Student
    //router.post("/:studentId/tasks/", [authenticate], tasks.create);
    router.post("/tasks/", tasks.create);
  
    // Retrieve all Tasks for a Student
    router.get(
      "/tasks/",
      tasks.findAll
    );
  
    // Retrieve a single Task with id
    //router.get("/:studentId/tasks/:id", [authenticate], tasks.findOne);
    router.get("/tasks/:id", tasks.findOne);
  
    // Update a Task with id
    router.put("/tasks/:id", tasks.update);
  
    // Delete a Task with id
    router.delete("/tasks/:id", tasks.delete);
  
    // Delete all Tasks
    router.delete("/tasks/deleteAll", tasks.deleteAll);
  
    app.use("/flight-plan-t5", router);
  };
  
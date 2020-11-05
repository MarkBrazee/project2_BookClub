const db = require("../models");

module.exports = function(app){

  // All routes will go in here
  app.get("/api/test", function(req, res){
    db.Test.findAll({}) // curly brackets are for specific items/searches
    .then(function(data){
      res.json(data)
    });
  });

  app.post("/api/post", function(req, res){
    db.Test.create({test: req.body}) // On front end make sure that we have an object with the same structure as our model
    .then(function(data){
      res.json(data)
    });
  });
};
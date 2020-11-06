const db = require("../models");

module.exports = function(app){

  // All routes will go in here
  app.get("/api/books", function(req, res){
    db.bookTable.findAll({}) // curly brackets are for specific items/searches
    .then(function(data){
      data.forEach(element => {
        console.log(element.dataValues)
        
      });
      res.json(data)
    });
  });

  app.post("/api/books", function(req, res){
    db.bookTable.create({
      book_title: req.body.book_title, author_name: req.body.author_name, book_cover: req.body.book_cover
    }, (result)=>{
      res.json({id: result.insertID})
    }) // On front end make sure that we have an object with the same structure as our model
    .then(function(data){
      res.json(data)
    });
  });
};
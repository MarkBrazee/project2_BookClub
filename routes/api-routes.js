const db = require("../models");

module.exports = function(app){

  // All routes will go in here
  app.get("/api/books", function(req, res){
    db.bookTable.findAll({}) // curly brackets are for specific items/searches
    .then(function(data){ // this sends back an array
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

  app.put("/api/books/:id", function(req,res){
    db.bookTable.update({
      read_status: req.body.read_status
    }, {
      where: {
        id: req.params.id
      }
    }, (result)=>{
      res.json(result)
    })
  })

  app.delete("/api/books/:id", (req,res)=>{
    db.bookTable.destroy({
      where: {
        id: req.params.id
      }
    }).then((data)=>{
      res.json(data)
    })
  })
};
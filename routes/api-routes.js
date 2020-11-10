const db = require("../models");
const passport = require("../config/passport");

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

  app.post("/api/login", passport.authenticate("local"), function(req, res){
    console.log("line 30")
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res){
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(function(){
      console.log("Made it to line 39")
      res.redirect(307, "/api/login");
    })
    .catch(function(err){
      res.status(401).json(err);
    });
  });

  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res){
    if(!req.user){
      res.json({});
    } else {
      res.json({
        email:req.user.email,
        id: req.user.id
      });
    }
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
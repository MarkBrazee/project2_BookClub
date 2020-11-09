const isAuthenticated = require("../config/middleware/isAuthenticated");
let db = require("../models")

var path = require("path");

module.exports = function(app) {
  
  app.get("/books", function(req, res){
    db.bookTable.findAll({raw: true}).then((DBGrab)=>{
      // console.log(DBGrab)
      // let hbsObject = {
      //   bookTable: DBGrab
      // }
      // console.log(hbsObject)
      res.render('index',{bookTable:DBGrab})
    })
  });

  app.get("/", function(req, res){
    if(req.user){
      res.redirect("/books");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res){
    if(req.user){
      res.redirect("/books");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/books", isAuthenticated, function(req, res){
    res.render("index")
  });
};
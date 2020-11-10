var isAuthenticated = require("../config/middleware/isAuthenticated");
let db = require("../models")

var path = require("path");

module.exports = (app)=>{
  
  app.get("/books", (req, res)=>db.bookTable.findAll({raw: true}).then((DBGrab)=>res.render('home',{bookTable:DBGrab})));

  app.get("/", (req, res)=>{
    if(req.user){
      res.redirect("/books");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render('index');
  });

  app.get("/login", (req, res)=>{
    if(req.user){
      res.redirect("/books");
    }
    res.render('login');
  });

  app.get("/books", isAuthenticated, (req, res)=>res.render("home"));
};
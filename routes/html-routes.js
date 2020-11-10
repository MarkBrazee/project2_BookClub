const isAuthenticated = require("../config/middleware/isAuthenticated");
let db = require("../models")

var path = require("path");

module.exports = (app)=>{
  
  app.get("/books", (req, res)=>db.bookTable.findAll({raw: true}).then((DBGrab)=>res.render('index',{bookTable:DBGrab})));

  app.get("/", (req, res)=>{
    if(req.user){
      res.redirect("/books");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res)=>{
    if(req.user){
      res.redirect("/books");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/books", isAuthenticated, (req, res)=>res.render("index"));
};
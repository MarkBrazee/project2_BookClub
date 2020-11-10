const db = require("../models");
const passport = require("../config/passport");

module.exports = (app)=>{

  // All routes will go in here
  app.get("/api/books", (req, res)=>{db.bookTable.findAll({}).then((data)=>res.json(data))});

  app.post("/api/books", (req, res)=>{
    db.bookTable.create({
      book_title: req.body.book_title, author_name: req.body.author_name, book_cover: req.body.book_cover
    }, (result)=>{res.json({id: result.insertID})}).then((data)=>res.json(data));
  });

  app.post("/api/login", passport.authenticate("local"), (req, res)=>res.json(req.user));

  app.post("/api/signup", (req, res)=>{
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(function(){
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

  app.put("/api/books/:id", (req,res)=>{
    db.bookTable.update({
      read_status: req.body.read_status
    }, {
      where: {
        id: req.params.id
      }
    }, (result)=>res.json(result))
  })

  app.delete("/api/books/:id", (req,res)=>{
    db.bookTable.destroy({
      where: {
        id: req.params.id
      }
    }).then((data)=>res.json(data))
  })
};
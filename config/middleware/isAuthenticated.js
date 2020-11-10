module.exports = function(req, res, next){
  if(req.user){
    // return res.redirect("/books");
    return next();
  }

  return res.redirect("/")
};
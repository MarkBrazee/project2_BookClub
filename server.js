var express = require("express");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;
var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db = require("./models");

// Routes
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

let db = require("../models")
module.exports = function(app) {
  app.get("/", function(req, res){
    db.bookTable.findAll({raw: true}).then((DBGrab)=>{
      // console.log(DBGrab)
      // let hbsObject = {
      //   bookTable: DBGrab
      // }
      // console.log(hbsObject)
      res.render('index',{bookTable:DBGrab})
    })
  });
};
module.exports = function( sequelize, DataTypes){
  var Test = sequelize.define("Test", {
    test: {
      type: DataTypes.STRING
    }
  })
  return Test;
}
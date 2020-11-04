module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return Book;
  };
  
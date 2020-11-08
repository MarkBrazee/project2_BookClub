const { Sequelize } = require("sequelize");

module.exports = function( sequelize, DataTypes){
  let bookTable = sequelize.define('bookTable', {
    book_title: {
        type: Sequelize.STRING
    },
    author_name: {
        type: Sequelize.STRING
    },
    book_cover: {
        type: Sequelize.STRING
    },
    read_status: {
      type: Sequelize.BOOLEAN
    }
},
{freezeTableName: true});
  return bookTable;
}


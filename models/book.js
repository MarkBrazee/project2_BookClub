const { Sequelize } = require(".");

module.exports = function( sequelize, DataTypes){
  let bookTable = sequelize.define('tableName', {
    book_title: {
        type: sequelize.STRING
    },
    author_name: {
        type: sequelize.STRING
    },
    book_description: {
        type: sequelize.STRING
    },
    book_cover: {
        type: sequelize.STRING
    }
},
{freezeTableName: true});
  return bookTable;
}


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a sub document for users model
const FavoriteCatsSchema = new Schema({
  url: String
});

module.exports = FavoriteCatsSchema;

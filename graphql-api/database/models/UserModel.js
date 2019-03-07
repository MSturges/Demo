const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteCatsSchema = require("./FavoriteCatsSubDoc");

const validateEmail = function(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please use a valid email address"]
  },
  password: String,
  favoriteCatPics: [FavoriteCatsSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  jwtVersion: Number
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

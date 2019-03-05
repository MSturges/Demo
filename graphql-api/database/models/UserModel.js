const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validURL = function(str) {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please use a valid email address"]
  },
  password: String,
  favoriteCatPics: [
    new Schema({
      url: {
        type: String,
        validate: [validURL, "Please use a valid url"],
        required: [true, "url is required."]
      }
    })
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  jwtVersion: Number
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

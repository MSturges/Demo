const UserModel = require("../../models/UserModel");

module.exports = userProps => {
  console.log("mongoose", userProps);
  const user = new UserModel(userProps);
  return user.save();
};

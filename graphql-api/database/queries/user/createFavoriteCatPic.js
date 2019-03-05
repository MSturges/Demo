const UserModel = require("../../models/UserModel");

module.exports = ({ userID, url }) => {
  return UserModel.findOne({ _id: userID }).then(user => {
    // add the groupChatId for each users chatGroups
    user.favoriteCatPics.push({ url: url });
    return user.save();
  });
};

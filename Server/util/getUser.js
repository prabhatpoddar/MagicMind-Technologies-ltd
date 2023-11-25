const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports.getUser = async (token, next) => {
  token = token.replace("Bearer ", "");
  await jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      next("INVALID_TOKEN");
    } else {
      const userData = User.findOne({ _id: user._id });
      if (userData == null) {
        next("INVALID_TOKEN");
      } else {
        next(user);
      }
    }
  });
};

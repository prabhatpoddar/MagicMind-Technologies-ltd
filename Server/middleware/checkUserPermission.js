const { getUser } = require("../util/getUser");

module.exports.checkUserPermission = () => {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.replace("Bearer ", "");

      await getUser(token, (user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(403).json({
            message: "Forbidden: you don't have enough access to this content",
          });
        }
      });
    } else {
      res.status(401).json({ message: "Unauthorized Request" });
    }
  };
};

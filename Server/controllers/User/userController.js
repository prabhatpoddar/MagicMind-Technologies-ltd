const User = require("../../models/User.model");
module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};

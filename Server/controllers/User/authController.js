const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../middleware/createToken");
const { body, validationResult } = require("express-validator");

module.exports.register = [
  body("email").not().isEmpty().withMessage("Email field is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.create({ ...req.body });
      const token = await createToken(user);
      res.status(201).json({ user: user, token: token });
    } catch (err) {
      console.log(err);
      let error = err.message;
      res.status(400).json({ error: error });
    }
  },
];

module.exports.loginAdmin = [
  body("email").not().isEmpty().withMessage("Email field is required"),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findOne({ email });
      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = await createToken(user);
          res.status(200).json({ user, token });
        } else throw Error("Please enter correct password");
      } else throw Error("Please enter valid email");
    } catch (err) {
      let error = err.message;
      res.status(400).json({ error: error });
    }
  },
];

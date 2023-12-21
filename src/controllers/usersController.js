const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
//registration
const registration = async function (req, res) {
  const hashedPassword = await hash(req.body.password, 10);

  let newUser = new User({
    ...req.body,
    role: "user",
    password: hashedPassword,
  });

  try {
    const result = await newUser.save();

    res
      .status(200)
      .json({ data: result, message: "User was added successfully." });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      // Error code 11000 represents a duplicate key error (username in this case)
      res.status(400).send("Username already exists");
    } else {
      res.status(400).send(error.message);
    }
  }
};

// login
const login = async function (req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (user && user.password) {
      const isValidPassword = await compare(password, user.password);
      if (isValidPassword) {
        const payload = {
          id: user._id,
          usrname: user.username,
          role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res
          .status(200)
          .json({ status: "Success", token: token, data: payload });
      } else {
        res.status(401).json({ msg: "Login failed! Please try again." });
      }
    } else {
      res
        .status(401)
        .json({ msg: "Login failed! Enter a valid username or password!." });
    }
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

module.exports = {
  registration,
  login,
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
module.exports = {
  async registerUser(req, res) {
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({email: email,});
      if (user) {
        return res.status(200).json({
          sucess: false,
          err: "124",
          msg: "User Already Exists",
        });
      }

      user = new User({
        username,
        email,
        password,

      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "polosgym", {expiresIn: '7d'},(err, token) => {

          if (err) throw err;
          res.status(200).json({
            token:token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  },
  async logUserIn(req, res) {
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({email: email,});
      if (user) {
        return res.status(200).json({
          sucess: false,
          err: "124",
          msg: "User Already Exists",
        });
      }

      user = new User({
        username,
        email,
        password,

      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "polosgym", {expiresIn: '7d'},(err, token) => {

          if (err) throw err;
          res.status(200).json({
            token:token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  },
  async logUserOut(req, res) {
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({email: email,});
      if (user) {
        return res.status(200).json({
          sucess: false,
          err: "124",
          msg: "User Already Exists",
        });
      }

      user = new User({
        username,
        email,
        password,

      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "polosgym", {expiresIn: '7d'},(err, token) => {

          if (err) throw err;
          res.status(200).json({
            token:token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  },
  async VerifyUserToken(req, res) {

  },
};

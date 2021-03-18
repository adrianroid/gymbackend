const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
import { v4 as uuidv4 } from 'uuid';
const SECRET = 'polosgym'
const EXPIRES = '7d'
module.exports = {
  async registerUser(req, res) {
    const data = req.body;
    try {
      let result = await user.findOne({ email: email });
      if (result) {
        return res.status(200).json({
          sucess: false,
          err: "13",
          msg: "User Already Exists",
        });
      }

      _user = new User({
        email: data.email,
        password: data.password,
        fk: uuidv4(),
        address1: data.address1,
        paymentInfo: [{
          card: data.card.substr(data.card.length - 4),
          cardType: data.cardType,
          cvv: data.cvv,
          yyyy: data.yyyy,
          mm: data.mm,
        }]
      });

      const salt = await bcrypt.genSalt(10);
      _user.password = await bcrypt.hash(password, salt);

      await _user.save();

      const payload = {
        user: {
          email: user.email,
          fk: user.fk
        },
      };

      jwt.sign(payload, SECRET, { expiresIn: EXPIRES}, (err, token) => {
        if (err) throw err;
        else res.status(200).json({ sucess: true, token: token});
      }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(200).json({
        sucess: false,
        err: "55",
        msg: "Error in Saving",
      });
    }
  },
  async logUserIn(req, res) {
    const { email, password } = req.body;
    try {
      let _user = await user.findOne({ email: email });
      if (!_user) {
        return res.status(200).json({
          sucess: false,
          err: "67",
          msg: "Incorrect User Name / Password.",
        });
      }
      else {
        var hash = result.password;
        if (bcrypt.compareSync(password, hash)) {
          const payload = {
            user: {id: user.id,}, 
          };
          jwt.sign(payload, SECRET, {expiresIn: EXPIRES},(err, token) => {
              if (err) throw err;
              res.status(200).json({
                sucess: true,
                token: token,
              });
            }
          );
        } else {
          console.log("AUTHENTICATION FAILED");
          deferred.resolve(false);
        }
      }
    } catch (err) {
      return res.status(200).json({
        sucess: false,
        err: "100",
        msg: "Error in Login: " + JSON.stringify(err),
      });
    }
  },
  async verifyUserToken(req, res) {
    const { token } = req.body;
    jwt.verify(token, SECRET, (err, decoded) =>{
      if(decoded){
        res.status(200).json({
          sucess: true,
          token: token,
        });
      }else {
        res.status(200).json({
          sucess: false,
          err: "109",
          msg: "Need Auth"
        });
      }
    });
  },
};

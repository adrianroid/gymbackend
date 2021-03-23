
const { v4: uuidv4 } = require('uuid');
const Customer = require("globalpayments-api")
const Address = require("globalpayments-api");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const invoice = require('../model/invoice');
const EXPIRES = '7d'
_payment = require('../modules/payment')
module.exports = {
  async registerUser(req, res) {
    const data = req.body;
    try {
      let result = await user.findOne({ email: data.email });
      if (result) {
        return res.status(200).json({
          sucess: false,
          err: "13",
          msg: "Email Address Already Exists",
        });
      }

      var fk = uuidv4();
      // PARAMS.ccexpyear = `20${PARAMS.ccexpyear}`.substr(-4);
      // PARAMS.ccexpmonth = `00${PARAMS.ccexpmonth}`.substr(-2);
      var res_token = await _payment.createToken({
        card_data: {
          number: data.card,
          expMonth: data.expMonth,
          expYear: data.expYear,
          cvn: data.cvv,
          cardHolderName: data.cardHolderName
        },
        address: {
          postalCode: data.postalCode,
        }
      })
      
      //Charge Token
      var authorization = await _payment.chargeToken({
        tk: res_token.token,
        expMonth: data.expMonth,
        expYear: data.expYear, 
        amount: data.amount
      });
      
      //MONGO DB CREATE
      _user = new User({
        email: data.email,
        password: data.password,
        fk: fk,
        address1: data.address1,        
        paymentInfo: [{
          card: data.card.substr(data.card.length - 4),
          cardType: data.cardType,
          cardHolderName: data.cardHolderName,
          cvv: data.cvv,
          expYear: data.expYear,
          expMonth: data.expMonth,
          postalCode: data.postalCode,
          paymentToken: res_token
        }]
      });

      var _invoice = new invoice({
        userFk: fk,

      });
      const salt = await bcrypt.genSalt(10);
      _user.password = await bcrypt.hash(password, salt);

      await _user.save();

      res.cookie('id', fk, { expires: new Date(Date.now() + 900000), httpOnly: true })
      res.status(200).json({ sucess: true });

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
        var hash = _user.password;
        if (bcrypt.compareSync(password, hash)) {
          // const payload = {
          //   user: {id: user.id,}, 
          // };
          res.cookie('id', _user.fk, { expires: new Date(Date.now() + 900000), httpOnly: true })
          res.status(200).json({ sucess: true });
          // jwt.sign(payload, SECRET, {expiresIn: EXPIRES},(err, token) => {
          //     if (err) throw err;
          //     res.status(200).json({
          //       sucess: true,
          //       token: token,
          //     });
          //   }
          // );
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
};

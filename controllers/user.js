const { v4: uuidv4 } = require("uuid");
const Customer = require("globalpayments-api");
const Address = require("globalpayments-api");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Invoice = require("../model/invoice");
const EXPIRES = "7d";
_payment = require("../modules/payment");
const MONGO = require("../db").getDB();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const uploadFile = require("../modules/uploadFile")
const findUser = (col, query) => {
  return new Promise((resolve, reject) => {
    MONGO.collection(col).findOne(query, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
const find = (col, query) => {
  return new Promise((resolve, reject) => {
    MONGO.collection(col)
      .find(query)
      .toArray(function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    // MONGO.collection(col).find(query, (err, data) => {
    //   if (err) reject(err)
    //   else resolve(data);
    // })
  });
};
module.exports = {
  async registerUser(req, res) {
    const data = req.body;
    try {
      let result = await User.findOne({ email: data.email });
      if (result) {
        return res.status(200).json({
          success: false,
          err: "13",
          msg: "Email Address Already Exists",
        });
      }

      var fk = uuidv4();
      // PARAMS.ccexpyear = `20${PARAMS.ccexpyear}`.substr(-4);
      // PARAMS.ccexpmonth = `00${PARAMS.ccexpmonth}`.substr(-2);

      const cardEncrpty = cryptr.encrypt(data.card_number);
      //MONGO DB CREATE
      var _user = new User({
        email: data.email,
        password: data.password,
        fk: fk,
        phone: data.phone,
        first_name: data.first_name,
        last_name: data.last_name,
        paymentInfo: [
          {
            card: cardEncrpty,
            cardType: data.cardType,
            cardHolderName: data.cardHolderName,
            cvv: data.cvv,
            expYear: data.expYear,
            expMonth: data.expMonth,
            postalCode: data.postalCode,
            //paymentToken: res_token.token, // need multi-token
            c_num: data.card_number,
          },
        ],
      });
      //Upload Images to Local
      //Charge Token TODO
      // var authorization = await _payment.chargeToken({
      //   tk: res_token.token,
      //   expMonth: data.expMonth,
      //   expYear: data.expYear,
      //   amount: data.amount
      // });

      let _t = Date.now();
      // var _invoice = new Invoice({
      //   user: _user._id.toString(),
      //   transid: authorization.transactionId,
      //   invoice_num: _t.toString().substr(_t.length - 6),
      //   email: data.email,
      //   fk: fk,
      // });
      if(data.profileImg)
        uploadFile.upload(req.body.profileImg)
      const salt = await bcrypt.genSalt(10);
      _user.password = await bcrypt.hash(data.password, salt);

      await _user.save();
      // await _invoice.save();

      res.status(200).json({ success: true });
    } catch (err) {
      return res.status(200).json({
        success: false,
        err: "105",
        msg: err.message || "Error Creating User",
      });
    }
  },
  async logUserIn(req, res) {
    var data = req.body;
    try {
      let _user = await findUser("users", { email: data.email });
      if (!_user) {
        return res.status(200).json({
          success: false,
          err: "67",
          msg: "Incorrect User Name / Password.",
        });
      } else {
        var hash = _user.password;
        if (bcrypt.compareSync(data.password, hash)) {
          // const payload = {
          //   user: {id: user.id,},
          // };
          res.cookie("session", _user.fk, { expires: new Date(Date.now() + 9000000000), httpOnly: false });
          res.status(200).json({ success: true, email: data.email, active: _user.isActive, isAdmin: _user.isAdmin, user: _user });
          // jwt.sign(payload, SECRET, {expiresIn: EXPIRES},(err, token) => {
          //     if (err) throw err;
          //     res.status(200).json({
          //       success: true,
          //       token: token,
          //     });
          //   }
          // );
        } else {
          return res.status(200).json({
            success: false,
            err: "129",
            msg: "Email or Password is incorrect",
          });
        }
      }
    } catch (err) {
      return res.status(200).json({
        success: false,
        err: "137",
        msg: "Error in Login: " + JSON.stringify(err.message),
      });
    }
  },
  async getAllUsers(req, res) {
    if (!req.cookies.session) {
      return res.status(200).json({
        success: false,
        err: "146",
        msg: "No session. Please login.",
      });
    }
    var _users = await find("users", { isAdmin: false });
    res.status(200).json({
      success: true,
      items: _users,
    });
  },
  async getCurrUser(req, res) {
    if (!req.cookies.session) {
      return res.status(200).json({
        success: false,
        err: "146",
        msg: "No session. Please login.",
      });
    }

    var _user = await findUser("users", { fk: req.cookies.session });
    delete _user.paymentInfo;
    delete _user._id;
    delete _user.password;
    delete _user.isAdmin;
    delete _user.fk;
    return res.status(200).json({
      success: true,
      data: _user,
    });
  },
};

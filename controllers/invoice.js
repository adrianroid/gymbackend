const express = require('express');
const invoiceController = require('../../controllers/inovice');
var router = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const invoiceCollenction = require("../model/invoice");
import { v4 as uuidv4 } from 'uuid';
const SECRET = 'polosgym'
const EXPIRES = '7d'
module.exports = {
  async getInvoices(req, res) {
      var _data = req.body
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
    const data = req.body;
    // invoiceCollenction



  }
}
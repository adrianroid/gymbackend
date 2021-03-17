//FILENAME : User.js

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: { type: Date, default: Date.now()},
  address1: {type: String, required: true},
  city: {type: String, required: true},
  state:{type: String, required: true},
  postalCode:{type: String, required: true},
  country:{type: String, required: true},
  phone: {type: String, required: true},
  isActive:{type: Boolean, required: true},
  paymentInfo:[{
    accountNumber : {
      type: String
    },
    routingNumber : { 
      type: String
    },
    card: {
      type: String,
    },
    cardType: {
      type: String,
    },
    defaultPaymentMethod: {
      type: Boolean,
      default: false
    },
    isDeleted:{
      type: Boolean,
      default: false
    },
    cvv:{
      type: String,
    },
    yy:{
      type: String,
    },
    mm:{
      type: String,
    },
    lastModified:{ type: Date, default: Date.now()}
  },
],
Fk:{type: String, required: true},
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
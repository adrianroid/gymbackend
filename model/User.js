//FILENAME : User.js

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: { type: Date, default: Date.now()},
  address1: {type: String, required: true},
  address2: {type: String },
  city: {type: String, required: true},
  state:{type: String, required: true, default: "CA"},
  postalCode:{type: String, required: true},
  phone: {type: String, required: true},
  isActive:{type: Boolean, default: true},
  paymentInfo:[{
    accountNumber :{type: String},
    routingNumber :{type: String},
    card: {type: String},
    cardType: {type: String},
    defaultPaymentMethod: {type: Boolean,default: true},
    isDeleted:{type: Boolean,default: false },
    cvv:{ type: String },
    yyyy:{ type: String },
    mm:{type: String},
    lastModified:{ type: Date, default: Date.now()}
  }],
fk:{type: String, required: true},
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
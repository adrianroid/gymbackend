//FILENAME : User.js

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: { type: Date, default: Date.now()},  
  address2: {type: String },
  state:{type: String, required: true, default: "CA"},
  phone: {type: String, required: true},
  isActive:{type: Boolean, default: true},
  role: {type: String, default: "user"},
  company_id: {type: String, default: "1"},
  paymentInfo:[{
    accountNumber :{type: String},
    routingNumber :{type: String},
    card: {type: String},
    cardType: {type: String},
    defaultPaymentMethod: {type: Boolean,default: true},
    isDeleted:{type: Boolean,default: false },
    cvv:{ type: String },
    expYear:{ type: String },
    expMonth:{type: String},
    lastModified:{ type: Date, default: Date.now()},
    paymentToken:{type: String, required: true},
    postalCode:{type: String, required: true},
  }],
fk:{type: String, required: true},
});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);
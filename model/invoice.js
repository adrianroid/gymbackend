//FILENAME : User.js

const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  user: {type: String, required: true},
  success: {type: Boolean, default: true},
  transid: {type: String, required: true},
  createdAt: { type: Date, default: Date.now()},
  message: { type: String},
  email: { type: String},
  fk:{type: String},
});

// export model user with UserSchema
module.exports = mongoose.model("invoices", InvoiceSchema);
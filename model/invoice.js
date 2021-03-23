//FILENAME : User.js

const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  userFk: {type: String, required: true},
  sucess: {type: Boolean, required: true},
  auth: {type: String, required: true},
  createdAt: { type: Date, default: Date.now()},
  message: { type: String},
});

// export model user with UserSchema
module.exports = mongoose.model("invoices", InvoiceSchema);
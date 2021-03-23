//FILENAME : User.js

const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  userFk: {type: Object, required: true},
  createdAt: { type: Date, default: Date.now()},
});

// export model user with UserSchema
module.exports = mongoose.model("invoices", InvoiceSchema);
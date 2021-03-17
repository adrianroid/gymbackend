//FILENAME : User.js

const mongoose = require("mongoose"), 
      ObjectId = Schema.ObjectId;

const InvoiceSchema = mongoose.Schema({
  userFk: mongoose.Schema.Types.ObjectId,
  sucess: Boolean
});

// export model user with UserSchema
module.exports = mongoose.model("invoices", InvoiceSchema);
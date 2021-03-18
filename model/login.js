//FILENAME : User.js

const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  lastModified:{ type: Date, default: Date.now()},
  fk:{type: String, required: true},
  ipaddress:{type: String},
  device: {type: String, required: true},
});

// export model user with UserSchema
module.exports = mongoose.model("user", LoginSchema);
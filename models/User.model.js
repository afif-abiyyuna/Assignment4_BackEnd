const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
  age: Number,
  phone: String,
  districts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District"
    }
  ]

});

const User = mongoose.model("User", userSchema);
module.exports = User;
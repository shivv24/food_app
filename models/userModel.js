const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "user is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      require: [true, "Phone Number is required"],
    },
    usertype: {
      type: String,
      require: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCS3uMVc54NYJHXFUSIUFZrI3Zp00EZ6KcA&s",
    },
    answer: {
      type: String,
      require: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);

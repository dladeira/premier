const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    hash: String,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

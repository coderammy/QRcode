const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true }
});
module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phonenumber: {
        type: String,
        require: true,
        minlength: 10,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
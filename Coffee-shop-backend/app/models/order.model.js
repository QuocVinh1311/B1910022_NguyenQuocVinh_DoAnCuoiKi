const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phonenumber: {
        type: String,
        require: true,
        minlength: 10,
    },
    address: {
        type: String,
        require: true,
    },
    products: {
        type: Array,
        require: true,
    },
    note: {
        type: String,
    },
    total: {
        type: Number,
        require: true,
    },
    payment: {
        type: String,
        require: true,
        default: "Thanh toán tiền mặt",
    },
    status: {
        type: String,
        require: true,
        default: "Chưa xử lý",
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
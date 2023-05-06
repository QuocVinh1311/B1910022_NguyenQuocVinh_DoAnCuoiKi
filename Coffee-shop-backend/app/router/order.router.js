const express = require('express');
const Order = require("../controller/order.controller");

const router = express.Router();

router.route("/create")
    .post(Order.createOrder);

//Lấy tất cả đơn hàng (đã chạy đúng)
router.route("/")
    .get(Order.getAllOrder);

//Lấy đơn hàng theo mã đơn hàng (đã chạy đúng)
router.route("/detail/:id")
    .get(Order.getOrderById);


router.route("/update/:id")
    .put(Order.updateOrder);

router.route("/email/:email")
    .get(Order.getOrderByEmail);

//Hủy đơn hàng
router.route("/cancel/:id")
    .put(Order.cancelOrder);



module.exports = router;
const express = require('express');
const Order = require("../controller/order.controller");

const router = express.Router();

router.route("/create")
    .post(Order.createOrder);


router.route("/")
    .get(Order.getAllOrder);


router.route("/detail/:id")
    .get(Order.getOrderById);


router.route("/update/:id")
    .put(Order.updateOrder);

router.route("/email/:email")
    .get(Order.getOrderByEmail);

router.route("/cancel/:id")
    .put(Order.cancelOrder);



module.exports = router;
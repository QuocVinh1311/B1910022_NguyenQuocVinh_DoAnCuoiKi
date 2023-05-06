const express = require('express');
const Product = require("../controller/product.controller");

const router = express.Router();

router.route("/create")
    .post(Product.createProduct);

router.route("/")
    .get(Product.findProduct);

router.route("/detail/:id")
    .get(Product.findDetailProduct);


router.route("/searchproduct/bykeyword")
    .get(Product.searchProduct);

router.route("/update/:id")
    .put(Product.updateProduct);

router.route("/delete/:id")
    .delete(Product.deleteProduct);

module.exports = router;
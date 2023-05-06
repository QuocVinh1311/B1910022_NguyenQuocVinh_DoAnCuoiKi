const express = require('express');
const Auth = require("../controller/user.controller");

const router = express.Router();

router.route("/register")
    .post(Auth.register);

router.route("/login")
    .post(Auth.login);

router.route("/updateinfo/:id")
    .put(Auth.updateUserProfile);

router.route("/updatepwd/:id")
    .put(Auth.updatePassword);


router.route("/getaccountlist/:email")
    .get(Auth.getAccount);


router.route("/delete/:email")
    .delete(Auth.deleteAccount);


module.exports = router;
const express = require("express");
const controller = require("./../controllers/auth");


const router = express.Router();

router.route("/register").get(controller.showRegisterView).post(controller.register);
router.route("/login").get(controller.showLoginView).post(controller.login);
router.route("/logout").get(controller.logout)


module.exports = router;

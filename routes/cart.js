const express = require("express");
const controller = require("./../controllers/cart");
const authGuard = require("./../middlewares/authGuard");


const router = express.Router();

router.route("/").get(authGuard,controller.showCart);


router.route("/delete/:id").get(authGuard,controller.deletedCart);
router.route("/all-deleted").get(authGuard,controller.deletedAllCart);

router.route("/shipping").get(authGuard,controller.showshipping);
router.route("/shipping").post(authGuard,controller.addAddress);
router.route("/shipping/delete-address/:id").get(authGuard,controller.deleteAddress);
router.route("/shipping/edit-address").post(authGuard,controller.editAddress);

router.route("/payment").get(authGuard,controller.showPayment);

module.exports = router;

const express = require("express");
const controller = require("./../controllers/product");
const authGuard = require("./../middlewares/authGuard");

const router = express.Router();

router.route("/:id").get(controller.showDetailProduct);
router.route("/add-cart").post(authGuard,controller.addCart);



module.exports = router;

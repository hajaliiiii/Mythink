const express = require("express");
const controller = require("./../controllers/product");


const router = express.Router();



router.route("/:id").get(controller.showCategoryProduct);




module.exports = router;

const express = require("express");
const controller = require("./../controllers/home");
const controllerCategory = require("./../controllers/category");
const controllerProduct = require("./../controllers/product");
const controllerUsers = require("./../controllers/users");
const controllerCart = require("./../controllers/cart");
const authGuard = require("./../middlewares/authGuard");
const roleGuard = require("./../middlewares/roleGuard");
const { multerStorage } = require("../middlewares/uploderConfigs");

const upload = multerStorage(
    "public/images/products",
    /jpeg|jpg|png/
);

const router = express.Router();

router.route("/").get(controller.home);
router.route("/searchresults").get(controller.searchTermid);
router.route("/filter").get(controller.filter);
router.route("/search").get(controller.search);




// Admin Panel
router.route("/p-admin").get(authGuard,roleGuard("ADMIN"),controller.panelAdmin);


router.route("/p-admin/product").get(authGuard,roleGuard("ADMIN"),controllerProduct.showProductAdmin);
router.route("/p-admin/show-add-product").get(authGuard,roleGuard("ADMIN"),controllerProduct.showAddProductAdmin);
router.route("/p-admin/add-product").post(authGuard,roleGuard("ADMIN"),upload.array("media", 5) ,controllerProduct.addProductAdmin);
router.route("/p-admin/edit-product").post(authGuard,roleGuard("ADMIN"),controllerProduct.editProductAdmin);
router.route("/p-admin/product/delete-product/:id").get(authGuard,roleGuard("ADMIN"),controllerProduct.deletedProductAdmin);
router.route("/p-admin/product/edit-product/:id").get(authGuard,roleGuard("ADMIN"),controllerProduct.showEditedProductAdmin);


router.route("/p-admin/category").get(authGuard,roleGuard("ADMIN"),controllerCategory.showCategoryAdmin);
router.route("/p-admin/show-add-category").get(authGuard,roleGuard("ADMIN"),controllerCategory.showAddCategoryAdmin);
router.route("/p-admin/add-category").post(authGuard,roleGuard("ADMIN"),controllerCategory.addCategoryAdmin);
router.route("/p-admin/product/edit-category/:id").get(authGuard,roleGuard("ADMIN"),controllerCategory.showEditedCategoryAdmin);
router.route("/p-admin/product/delete-category/:id").get(authGuard,roleGuard("ADMIN"),controllerCategory.deletedCategoryAdmin);
router.route("/p-admin/edit-category").post(authGuard,roleGuard("ADMIN"),controllerCategory.editCategoryAdmin);

router.route("/p-admin/users").get(authGuard,roleGuard("ADMIN"),controllerUsers.showUsersAdmin);
router.route("/p-admin/product/delete-user/:id").get(authGuard,roleGuard("ADMIN"),controllerUsers.deletedUserAdmin);

router.route("/p-admin/product/edit-user/:id").get(authGuard,roleGuard("ADMIN"),controllerUsers.showEditedUserAdmin);
router.route("/p-admin/edit-user").post(authGuard,roleGuard("ADMIN"),controllerUsers.editUserAdmin);


router.route("/p-admin/order-tracking/:id").get(authGuard,roleGuard("ADMIN"),controllerCart.showOrderTracking);
router.route("/p-admin/order-list").get(authGuard,roleGuard("ADMIN"),controllerCart.showOrderList);

module.exports = router;

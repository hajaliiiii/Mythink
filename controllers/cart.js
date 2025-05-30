const Category = require('../repositories/category');
const Cart = require('../repositories/carts');
const Address = require('../repositories/address');

// User Panel
exports.showCart = async (req, res) => {
    const userId = req.cookies["AccessToken"];


    const category = await Category.showCategory();
    const cart = await Cart.showAllCartUser({userId});
    const count = await Cart.countCart({User_ID : req.cookies["AccessToken"]});
    const sum = await Cart.sumPriceCart({User_ID : req.cookies["AccessToken"]});
    res.render("checkout-cart.ejs", {category, cart , count ,sum});
};
exports.showshipping = async (req, res) => {
    const address = await Address.showAddress({userId: req.cookies["AccessToken"]});
    const category = await Category.showCategory();
    const count = await Cart.countCart({User_ID : req.cookies["AccessToken"]});
    const sum = await Cart.sumPriceCart({User_ID : req.cookies["AccessToken"]});
    res.render("checkout-shipping.ejs" , {address , category, count , sum});
};
exports.showPayment = async (req, res) => {
    const category = await Category.showCategory();
    const count = await Cart.countCart({User_ID : req.cookies["AccessToken"]});
    const sum = await Cart.sumPriceCart({User_ID : req.cookies["AccessToken"]});
    res.render("checkout-payment.ejs" , {category, count , sum});
};
exports.addAddress = async (req, res) => {
    const Id_Users_Adrees = req.cookies["AccessToken"];
    const {first_name, last_name, phone, code_meli, ostan, city, Adrees, Code_Posti} = req.body;
    const address = await Address.create({
        first_name, last_name, phone,
        code_meli, Id_Users_Adrees,
        ostan, city, Adrees, Code_Posti
    });
    res.redirect('/cart/shipping')
};
exports.deletedCart = async (req, res) => {
    const {id} = req.params;
    const del = await Cart.deletedCart({id});
    res.redirect(`/cart`);
};
exports.deleteAddress = async (req, res) => {
    const {id} = req.params;

    const del = await Address.deletedAddress({id});
    res.redirect(`/cart/shipping`);
};
exports.editAddress = async (req, res) => {
    const Id_Users_Adrees = req.cookies["AccessToken"];
    const {first_name, last_name, phone, code_meli, ostan, city, Adrees, Code_Posti} = req.body;
    const address = await Address.edit({
        first_name, last_name, phone,
        code_meli, ostan, city, Adrees, Code_Posti , Id_Users_Adrees
    });
    res.redirect(`/cart/shipping`);
};
exports.deletedAllCart = async (req, res) => {
    const userId = req.cookies["AccessToken"];
    const del = await Cart.deletedAllCart({userId});
    res.redirect(`/cart`);
};
// Admin Panel
exports.showOrderTracking = async (req, res) => {
    const {id} = req.params;
    const cart = await Cart.showAllCart({userId: id});

    res.render("p-admin/order-tracking.ejs", {cart});
};
exports.showOrderList = async (req, res) => {

    const carts = await Cart.showAllCarts();

    res.render("p-admin/order-list.ejs", {carts});
};
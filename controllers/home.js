const Category = require('../repositories/category');
const Product = require('../repositories/product');
const Cart = require('../repositories/carts');
const User = require("../repositories/users");
const redis = require("../redis");

// User Panel
exports.home = async (req, res) => {
    const User_ID = req.cookies?.AccessToken;

    const category = await Category.showCategory();
    const product = await Product.showProduct();
  
    let count = await Cart.countCart({User_ID});
    res.render("index.ejs", {category, product, count , User_ID});
    
};
exports.filter = async (req, res) => {
    const {id} = req.query;
    
    const onlyAvailable = await Category.onlyAvailable({id});
    const onlyDiscount = await Category.onlyDiscount({id});

    res.json({data : onlyAvailable , datatwo : onlyDiscount});
    
};
exports.searchTermid = async (req, res) => {
    const searchTerm = req.query.q;
    const searchTermid = req.query.id;
    const searchTermSelect = await Category.searchTermSelect({searchTerm,searchTermid});
    res.json({searchTermSelect})

    
};
// exports.salam = async (req, res) => {
   
//     console.log(cate)
    
// };
exports.search = async (req, res) => {
    const {q} = req.query;
    let pages = 0
    const category = await Category.showCategory();
    const products = await Product.showRelatedProducts({q});
    const count = await Cart.countCart({User_ID : req.cookies["AccessToken"]});


    res.render("shop.ejs", {category, products, count , pages})

};

// Panel Admin
exports.panelAdmin = async (req, res) => {

    res.render("p-admin/index.ejs");
};



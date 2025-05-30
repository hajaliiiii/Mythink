const Product = require('../repositories/product');
const Category = require('../repositories/category');
const Cart = require('../repositories/carts');


// User Panel
exports.showDetailProduct = async (req, res) => {
    const idDProduct = req.params.id;
    const category = await Category.showCategory();
    const detailProduct = await Product.showProductById({idDProduct});
    const q = detailProduct.Title;

    const relatedProduct = await Product.showRelatedProducts({q});
    const Size = detailProduct.Size_Product;
    const Color = detailProduct.Color_Product;
    const Attr = detailProduct.Attr_Product;

    // تبدیل به آرایه
    const resultedSize = Size.split(',');
    const resultedColor = Color.split(',');
    const resultedAttr = Attr.split(',');
    const count = await Cart.countCart({User_ID: req.cookies["AccessToken"]});

    res.render("product-detail.ejs", {
        category,
        count,
        detailProduct,
        resultedSize,
        resultedColor,
        resultedAttr,
        relatedProduct
    });
};
exports.addCart = async (req, res) => {
    const userId = req.cookies["AccessToken"];
    console.log(req.body)
    const {productId, color, size, qty, discount, price} = req.body;
    let a = price * discount / 100;
    let b = price - a;

    let sum = qty * b;

   await Cart.create({userId, productId, color, size, qty, discount, sum});
   req.flash('success' , "success");

   res.redirect(`/product-detail/${productId}`);

}
exports.showCategoryProduct = async (req, res) => {

    try {


    const {id} = req.params;

    const {page, limit, ordering} = req.query;
    if (ordering === undefined) {

        const offset = (page - 1) * limit;
        const category = await Category.showCategory();
        const countproducts = await Product.countCategoryProduct();
        const pages = Math.ceil(countproducts.count / limit);
        const products = await Product.showCategoryProduct({id, limit, offset});
        const count = await Cart.countCart({User_ID: req.cookies["AccessToken"]});

        res.render('shop.ejs', {category, count, products, pages})
    }
    else {
        const offset = (page - 1) * limit;
        const category = await Category.showCategory();
        const countproducts = await Product.countCategoryProduct();
        const pages = Math.ceil(countproducts.count / limit);
        const count = await Cart.countCart({User_ID: req.cookies["AccessToken"]});


        if (ordering === "new") {
            const products = await Product.showCategoryProductNew({id, limit, offset});
            res.render('shop.ejs', {category, count, products, pages})

        } else if (ordering === "expencive") {
            const products = await Product.showCategoryProductExpensive({id, limit, offset});
            res.render('shop.ejs', {category, count, products, pages})
        } else if (ordering === "cheap") {
            const products = await Product.showCategoryProductCheap({id, limit, offset});
            res.render('shop.ejs', {category, count, products, pages})
        }
    }
    }catch (e) {
        console.log(e)
    }
    }

// Panel Admin
exports.showProductAdmin = async (req, res) => {

    const products = await Product.showAdminProducts();

    res.render("p-admin/products.ejs", {products});
};
exports.showAddProductAdmin = async (req, res) => {

    const category = await Category.showCategory();
    res.render("p-admin/add-new-product.ejs", {category});
};
exports.showEditedProductAdmin = async (req, res) => {
    const {id} = req.params;

    const category = await Category.showCategory();
    const product = await Product.showProductById({idDProduct: id});

    res.render("p-admin/edit-product.ejs", {id, category, product});
};
exports.addProductAdmin = async (req, res) => {
    let fileNames = req.files.map((file) => file.filename);
    console.log(fileNames);
    const {
        Title,
        Description,
        Category_Id,
        Subcategory_Id,
        Color_Product,
        Size_Product,
        Price_Product,
        Qty_Product,
        discount_Product,
        Order_Product,
        Attr_Product,
    } = req.body;
    const user = await Product.addProduct({
        Title,
        Description,
        Category_Id,
        Subcategory_Id,
        Color_Product,
        Size_Product,
        Price_Product,
        Qty_Product,
        discount_Product,
        Order_Product,
        Attr_Product,
        img_Product_one: fileNames[0],
        img_Product_two: fileNames[1],
        img_Product_three: fileNames[2],
        img_Product_four: fileNames[3],
        img_Product_five: fileNames[4],

    });
    res.redirect("/p-admin/product");
};
exports.deletedProductAdmin = async (req, res) => {
    const {id} = req.params;
    const category = await Product.deletedProduct({id});
    res.redirect("/p-admin/product");
};
exports.editProductAdmin = async (req, res) => {

    const {
        Title,
        Description,
        Category_Id,
        Subcategory_Id,
        Color_Product,
        Size_Product,
        Price_Product,
        Qty_Product,
        discount_Product,
        Order_Product,
        Attr_Product,
        Id_Product
    } = req.body;

    const product = await Product.editProduct({
        Title,
        Description,
        Category_Id,
        Subcategory_Id,
        Color_Product,
        Size_Product,
        Price_Product,
        Qty_Product,
        discount_Product,
        Order_Product,
        Attr_Product,
        Id_Product
    });

    res.redirect("/p-admin/product");
};
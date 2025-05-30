const express = require("express");

const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const cartRoutes = require("./routes/cart");


const app = express();

app.use(express.json());
app.use(
    session({
        secret: "Secret key",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
// User Panel
app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/scripts", express.static(path.resolve(__dirname, "public/js")));
app.use("/fonts", express.static(path.resolve(__dirname, "public/fonts")));
app.use("/images", express.static(path.resolve(__dirname, "public/images")));
//Admin Panel
app.use("/p-admin/css", express.static(path.resolve(__dirname, "public/p-admin/css")));
app.use("/p-admin/js", express.static(path.resolve(__dirname, "public/p-admin/js")));
app.use("/p-admin/images", express.static(path.resolve(__dirname, "public/p-admin/images")));
app.use("/p-admin/fonts", express.static(path.resolve(__dirname, "public/p-admin/fonts")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use('/',homeRoutes);
app.use('/auth',authRoutes);
app.use('/product-detail',productRoutes);
app.use('/category',categoryRoutes);
app.use('/cart',cartRoutes);


//* 404 Error Handler
app.use((req, res) => {
    // console.log("this path is not found:", req.path);
    return res.render('404.ejs')
});

module.exports = app;

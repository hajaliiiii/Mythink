const User = require('../repositories/users');


exports.showRegisterView = async (req, res) => {

    res.render("register.ejs");
};
exports.register = async (req, res) => {
        try {
            const { phone } = req.body;

            const user = await User.create({
                phone,

            });

            req.flash('success' , "success");
            return res.redirect("/");
        } catch (err) {
            console.log(err)
        }
};

exports.showLoginView = async (req, res) => {

    res.render("login.ejs");
};

exports.login = async (req, res) => {
        try {
            const { phone } = req.body;
            const user = await User.findByPhoneNumber({
                phone,

            });

            res.cookie("AccessToken", user.Id_Users, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
            });


            req.flash('success' , "success");
            return res.redirect("/");
        } catch (err) {
            console.log(err)
        }
};
exports.logout = async (req, res) => {
        res.clearCookie("AccessToken");
        req.flash('error' , "error");
        res.redirect('/');
};
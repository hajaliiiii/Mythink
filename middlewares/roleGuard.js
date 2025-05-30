module.exports = (role) => {
    return (req, res, next) => {

        if (req.user === role) {

            next();
        }else {
            return res.redirect("/");
        }


    };
};

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.cookies["AccessToken"];
        if (accessToken) {
            if (Number(accessToken) === 79) {
                req.user = "ADMIN"
            } else {
                req.user = "USER";
            }
            next();
        } else {
            return res.redirect('/auth/login');
        }

    } catch (err) {
        return res.redirect("/auth/login");
    }
};

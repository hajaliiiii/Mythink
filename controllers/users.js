const User = require('../repositories/users');


exports.showUsersAdmin = async (req, res) => {
    const users = await User.findUsers();
    res.render("p-admin/all-users.ejs", { users });
};
exports.deletedUserAdmin = async (req, res) => {
    const users = await User.deleteUser({id: req.params.id});
   res.redirect("/p-admin/users");
};
exports.showEditedUserAdmin = async (req, res) => {
    const { id } = req.params;
   res.render("p-admin/edit-user.ejs" , {id});
};
exports.editUserAdmin = async (req, res) => {
    const {Role , Id_Users } = req.body;
    await User.editUser({Role , Id_Users});
   res.redirect("/p-admin/users");
};


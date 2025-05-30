const Category = require("../repositories/category");

// User Panel
// ...

// Admin Panel
exports.showCategoryAdmin = async (req, res) => {

    const category = await Category.showCategory();

    res.render("p-admin/category.ejs", {category});
};
exports.showAddCategoryAdmin = async (req, res) => {


    res.render("p-admin/add-new-category.ejs");
};
exports.addCategoryAdmin = async (req, res) => {
    const { Title_Category } = req.body;
    const user = await Category.addCategory({Title_Category});
    res.redirect("/p-admin/category");
};
exports.deletedCategoryAdmin = async (req, res) => {
    const { id } = req.params;
    await Category.deletedCategory({id});
    res.redirect("/p-admin/category");
};
exports.showEditedCategoryAdmin = async (req, res) => {
    const { id } = req.params;

    const category = await Category.showCategoryById({id});
    res.render("p-admin/edit-category.ejs", { id , category});
};
exports.editCategoryAdmin = async (req, res) => {
    const { Title_Category,  Id_Category } = req.body;

    const category = await Category.editCategory({Title_Category,  Id_Category});
    console.log(category);
    res.redirect('/p-admin/category');
};

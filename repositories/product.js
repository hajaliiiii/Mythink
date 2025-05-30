const db = require('../db');


const showProductById = async ({idDProduct}) => {
    const query = "SELECT * FROM sam_product_sam INNER JOIN sam_category_sam ON sam_product_sam.Category_Id = sam_category_sam.Id_Category WHERE Id_Product = ?";

    const [user] = await db.execute(query, [idDProduct]);

    return user[0];
};
const countCategoryProduct = async () => {
    const query = "SELECT COUNT(Id_Product) AS count FROM sam_product_sam ";

    const [user] = await db.execute(query);

    return user[0];
};
const showProduct = async () => {
    const query = "SELECT * FROM sam_product_sam ";

    const [user] = await db.execute(query);

    return user;
};
const showRelatedProducts = async ({q}) => {
    const query = "SELECT * FROM sam_product_sam WHERE Title LIKE ?";

    const [user] = await db.execute(query, [`%${q}`]);

    return user;
}
const showCategoryProduct = async ({id , limit , offset}) => {
    const newLimit = Number(limit);
    const newOffset = Number(offset);

    if (isNaN(newLimit) || isNaN(newOffset)) {
        throw new Error("limit یا offset باید عدد معتبر باشند");
    }

    const query = `SELECT * FROM sam_product_sam WHERE Category_Id = ? ORDER BY Id_Product DESC LIMIT ${newLimit} OFFSET ${newOffset}`;
    const [rows] = await db.execute(query, [id]);
    return rows;

};
const showCategoryProductNew = async ({id , limit , offset}) => {
    const query = "SELECT * FROM sam_product_sam WHERE Category_Id = ? ORDER BY Id_Product DESC LIMIT ? OFFSET ?";

    const [user] = await db.execute(query, [id , limit , offset]);

    return user;
};
const showCategoryProductExpensive = async ({id , limit , offset}) => {
    const query = "SELECT * FROM sam_product_sam WHERE Category_Id = ? ORDER BY Price_Product DESC LIMIT ? OFFSET ?";

    const [user] = await db.execute(query, [id , limit , offset]);

    return user;
};
const showCategoryProductCheap = async ({id , limit , offset}) => {
    const query = "SELECT * FROM sam_product_sam WHERE Category_Id = ? ORDER BY Price_Product ASC  LIMIT ? OFFSET ?";

    const [user] = await db.execute(query, [id , limit , offset]);

    return user;
};
const showAdminProducts = async () => {
    const query = "SELECT * FROM sam_product_sam INNER JOIN sam_category_sam ON sam_product_sam.Category_Id = sam_category_sam.Id_Category";

    const [user] = await db.execute(query);

    return user;
}



const deletedProduct = async ({id}) => {
    const query = "DELETE FROM sam_product_sam WHERE Id_Product = ?";

    const [user] = await db.execute(query, [id]);


    return user;
}







const editProduct = async ({
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
                           }) => {
    const insertQuery = "UPDATE sam_product_sam SET  Title = ? , Description = ? , Category_Id= ? ,Subcategory_Id = ? , Color_Product = ? , Size_Product = ? , Price_Product = ? ,Qty_Product = ? , discount_Product = ?, Order_Product = ? , Attr_Product = ? WHERE Id_Product = ?";

    const [insertedUser] = await db.execute(insertQuery, [Title,
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
        Id_Product]);


    return insertedUser;
}

const addProduct = async ({
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
                              img_Product_one,
                              img_Product_two,
                              img_Product_three,
                              img_Product_four,
                              img_Product_five,
                          }) => {
    const insertQuery = "INSERT INTO sam_product_sam (Title,  Description, Category_Id, Subcategory_Id, Color_Product, Size_Product, Price_Product, Qty_Product, discount_Product, Order_Product, Attr_Product , img_Product_one, img_Product_two, img_Product_three, img_Product_four, img_Product_five) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";

    const [insertedUser] = await db.execute(insertQuery, [Title, Description, Category_Id, Subcategory_Id, Color_Product, Size_Product, Price_Product, Qty_Product, discount_Product, Order_Product, Attr_Product , img_Product_one, img_Product_two, img_Product_three, img_Product_four, img_Product_five]);

    return insertedUser;
};
module.exports = {
    showProductById,
    showProduct,
    showRelatedProducts,
    showCategoryProduct,
    showCategoryProductNew,
    showCategoryProductExpensive,
    showCategoryProductCheap,
    showAdminProducts,
    addProduct,
    deletedProduct,
    editProduct,
    countCategoryProduct,

};

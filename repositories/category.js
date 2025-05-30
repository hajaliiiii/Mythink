const db = require('../db');



const showCategory = async () => {
    const query = "SELECT * FROM sam_category_sam WHERE Id_Subcategory = 0 ";

    const [user] = await db.execute(query);

    return user;
};

const onlyAvailable = async ({id}) => {
    const query = "SELECT * FROM sam_product_sam WHERE Qty_Product > ? AND Category_Id = ?  ";

    const [user] = await db.execute(query,[0 , id]);

    return user;
};
const onlyDiscount = async ({id}) => {
    const query = "SELECT * FROM sam_product_sam WHERE discount_Product > ?  AND Category_Id = ? ";

    const [user] = await db.execute(query,[0 , id]);

    return user;
};
const searchTermSelect = async ({searchTerm,searchTermid}) => {
    const query = "SELECT * FROM sam_product_sam WHERE Title LIKE ? AND Category_Id = ? ";

    const [user] = await db.execute(query,[`%${searchTerm}`,searchTermid]);

    return user;
};

const showCategoryById = async ({id}) => {
    const query = "SELECT * FROM sam_category_sam WHERE Id_Subcategory = 0 AND Id_Category = ? ";

    const [user] = await db.execute(query,[id]);

    return user[0];
};
const addCategory = async ({Title_Category}) => {
    const insertQuery = "INSERT INTO sam_category_sam ( Title_Category ) VALUES (?)";

    const [insertedUser] = await db.execute(insertQuery, [Title_Category]);

    return insertedUser;
};
const deletedCategory = async ({id}) => {
    const query = "DELETE FROM sam_category_sam WHERE Id_Category = ?";

    const [user] = await db.execute(query, [id]);


    return user;
}

const editCategory = async ({Title_Category,Id_Category}) => {
    const insertQuery = "UPDATE sam_category_sam SET Title_Category = ? WHERE Id_Category = ?";

    const [insertedUser] = await db.execute(insertQuery, [Title_Category,Id_Category]);


    return insertedUser;
}
module.exports = {
    showCategory,
    addCategory,
    deletedCategory,
    showCategoryById,
    editCategory,
    onlyAvailable,
    onlyDiscount,
    searchTermSelect
};

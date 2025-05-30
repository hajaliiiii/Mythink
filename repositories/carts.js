const db = require("./../db");

const create = async ({productId, userId, color, size, qty, discount, sum}) => {
    const insertQuery = "INSERT INTO sam_carts_sam (Seller_Id,  Product_ID, User_ID ,Color_Cart ,Size_Cart ,qty, discount, Last_Price) VALUES (?,?, ?, ?, ?, ?, ?, ?)";

    const [insertedUser] = await db.execute(insertQuery, [79,productId, userId, color, size, qty, discount, sum]);


    return insertedUser;
};

const showAllCart = async ({userId}) => {
    const query = "SELECT * FROM sam_carts_sam INNER JOIN sam_users_sam ON sam_carts_sam.User_ID = sam_users_sam.Id_Users INNER JOIN sam_product_sam ON sam_carts_sam.Product_ID = sam_product_sam.Id_Product INNER JOIN sam_adrees_sam ON sam_carts_sam.Seller_Id = sam_adrees_sam.Id_Users_Adrees  WHERE User_ID = ? ";

    const [user] = await db.execute(query,[userId]);


    return user;
};
const showAllCartUser = async ({userId}) => {
    const query = "SELECT * FROM sam_carts_sam INNER JOIN sam_users_sam ON sam_carts_sam.User_ID = sam_users_sam.Id_Users INNER JOIN sam_product_sam ON sam_carts_sam.Product_ID = sam_product_sam.Id_Product INNER JOIN sam_adrees_sam ON sam_carts_sam.Seller_Id = sam_adrees_sam.Id_Users_Adrees  WHERE User_ID = ? AND status = 0 ";

    const [user] = await db.execute(query,[userId]);


    return user;
};
const showAllCarts = async () => {
    const query = "SELECT * FROM sam_carts_sam INNER JOIN sam_users_sam ON sam_carts_sam.User_ID = sam_users_sam.Id_Users INNER JOIN sam_product_sam ON sam_carts_sam.Product_ID = sam_product_sam.Id_Product INNER JOIN sam_adrees_sam ON sam_carts_sam.Seller_Id = sam_adrees_sam.Id_Users_Adrees ";

    const [user] = await db.execute(query);


    return user;
};
const deletedCart = async ({id}) => {
    const query = "DELETE FROM sam_carts_sam WHERE Id_Cart = ?";

    const [user] = await db.execute(query,[id]);


    return user;
};
const deletedAllCart = async ({userId}) => {
    const query = "DELETE FROM sam_carts_sam WHERE User_ID = ?";

    const [user] = await db.execute(query,[userId]);


    return user;
};
const countCart = async ({User_ID}) => {

    try {
        const query = "SELECT COUNT(`Id_Cart`) FROM sam_carts_sam WHERE User_ID = ?";

        const [user] = await db.execute(query , [User_ID]);


        return user;
    }catch (e) {
        // console.log("e => " , e)
    }
}
const sumPriceCart = async ({User_ID}) => {
    const query = "SELECT SUM(`Last_Price`)  FROM sam_carts_sam WHERE User_ID = ?";

    const [user] = await db.execute(query,[User_ID]);


    return user;
}

module.exports = {
    create,
    showAllCart,
    showAllCarts,
    deletedCart,
    deletedAllCart,
    countCart,
    sumPriceCart,
    showAllCartUser
};

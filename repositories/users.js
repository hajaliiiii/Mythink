const db = require("./../db");

const create = async ({ phone }) => {
    const insertQuery =
        "INSERT INTO sam_users_sam (Ph_Users, Role) VALUES (?, ?)";

    const [insertedUser] = await db.execute(insertQuery, [
        phone,
        "USER",
    ]);

    // const selectMainUser = "SELECT * FROM sam_users_sam WHERE Id_Users = ?";
    // const user = await db.execute(selectMainUser, [insertedUser.insertId]);

    return insertedUser;
};

const findByPhoneNumber = async ({phone}) => {
    const query = "SELECT * FROM sam_users_sam WHERE Ph_Users = ?";

    const [user] = await db.execute(query, [phone]);

    return user[0];
};

const findUsers = async () => {
    const query = "SELECT * FROM sam_users_sam ";

    const [user] = await db.execute(query);

    return user;
};

const deleteUser = async ({id}) => {
    const query = "DELETE FROM sam_users_sam WHERE Id_Users = ? ";

    const [user] = await db.execute(query,[id]);

    return user;
};

const editUser = async ({Role , Id_Users}) => {
    const insertQuery = "UPDATE sam_users_sam SET Role = ? WHERE Id_Users = ?";

    const [insertedUser] = await db.execute(insertQuery, [Role , Id_Users]);


    return insertedUser;
}


module.exports = {
    create,
    findByPhoneNumber,
    findUsers,
    deleteUser,
    editUser
};







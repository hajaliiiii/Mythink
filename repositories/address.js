const db = require("./../db");

const create = async ({first_name, last_name, phone, code_meli, Id_Users_Adrees, ostan, city, Adrees, Code_Posti}) => {
    const insertQuery = "INSERT INTO sam_adrees_sam (first_name, last_name , phone , code_meli ,Id_Users_Adrees, ostan, city, Adrees, Code_Posti) VALUES (?,?,?,?,?,?,?,?,?)";

    const [insertedUser] = await db.execute(insertQuery, [first_name, last_name, phone, code_meli, Id_Users_Adrees, ostan, city, Adrees, Code_Posti]);


    return insertedUser;
};
const edit = async ({first_name, last_name, phone, code_meli, ostan, city, Adrees, Code_Posti, Id_Users_Adrees}) => {
    const insertQuery = "UPDATE sam_adrees_sam SET first_name = ? ,last_name = ?,phone = ?,code_meli = ?,ostan = ?,city = ?,Adrees = ?,Code_Posti = ? WHERE Id_Users_Adrees = ?";

    const [insertedUser] = await db.execute(insertQuery, [first_name, last_name, phone, code_meli, ostan, city, Adrees, Code_Posti, Id_Users_Adrees]);


    return insertedUser;
};

const showAddress = async ({userId}) => {
    const query = "SELECT * FROM sam_adrees_sam WHERE Id_Users_Adrees  = ? ";

    const [user] = await db.execute(query, [userId]);


    return user;
};
const deletedAddress = async ({id}) => {
    const query = "DELETE FROM sam_adrees_sam WHERE Id_Adrees = ?";

    const [user] = await db.execute(query, [id]);


    return user;
};


module.exports = {
    create,
    edit, showAddress,
    deletedAddress,

};

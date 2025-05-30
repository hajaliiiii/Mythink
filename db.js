const mysql = require("mysql2/promise");


// CreatePool

const connection = mysql.createPool({
    uri: "mysql://root:@localhost:3306/mythink",
    // uri: "mysql://root:ShZpXZkdbRCkwSHQAImAUfbI@peaceful-ellis-n0miiaooq-db:3306/condescending_pike",


    connectionLimit: 10,
    waitForConnections: true,
});

module.exports = connection;

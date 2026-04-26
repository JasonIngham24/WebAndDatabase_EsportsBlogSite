const con = require("./db_connect")

async function createUserTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS USERS (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        user_first_name VARCHAR(50) NOT NULL,
        user_last_name VARCHAR(50) NOT NULL,
        user_name VARCHAR(50) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL UNIQUE
    );`

    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
      SELECT * FROM USERS;
    `
    await con.query(sql)
}

module.exports = { getAllUsers }
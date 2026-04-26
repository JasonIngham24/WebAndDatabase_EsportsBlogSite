const con = require("./db_connect")

async function createPostTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS POSTS (
        post_id INT AUTO_INCREMENT PRIMARY KEY,
        post_title VARCHAR(255) NOT NULL,
        post_content TEXT NOT NULL,
        post_date DATETIME NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES USERS(user_id)
    );`

    await con.query(sql)
}

createPostTable()

async function getAllPosts() {
    let sql = `
      SELECT * FROM POSTS;
    `
    await con.query(sql)
}

module.exports = { getAllPosts }
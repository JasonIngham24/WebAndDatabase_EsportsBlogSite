const con = require("./db_connect")

async function createCommentTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS COMMENTS (
        comment_id INT AUTO_INCREMENT PRIMARY KEY,
        comment_content TEXT NOT NULL,
        comment_date DATETIME NOT NULL,
        user_id INT NOT NULL,
        post_id INT NOT NULL,
        CONSTRAINT comment_user_fk FOREIGN KEY (user_id) REFERENCES USERS(user_id),
        CONSTRAINT comment_post_fk FOREIGN KEY (post_id) REFERENCES POSTS(post_id)
    );`

    await con.query(sql)
}

createCommentTable()

async function getAllComments() {
    let sql = `
      SELECT * FROM COMMENTS;
    `
    await con.query(sql)
}

module.exports = { getAllComments }
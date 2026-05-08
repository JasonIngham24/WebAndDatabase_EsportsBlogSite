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
      SELECT p.*, u.user_name as username 
      FROM POSTS p
      JOIN USERS u ON p.user_id = u.user_id;
    `
    return await con.query(sql)
}

async function getPost(post_id){
    let sql = `
        SELECT * FROM POSTS WHERE post_id = ?;
    `
    return await con.query(sql, [post_id])
}

async function createPost(post) {
    let sql = `
        INSERT INTO POSTS (post_title, post_content, post_date, user_id) 
        VALUES (?, ?, ?, ?)
    `
    const result = await con.query(sql, [post.title, post.content, post.date, post.user_id]);
    return { ...post, post_id: result.insertId };
}

async function updatePost(post_id, post) {
    let sql = `
        UPDATE POSTS
        SET post_title = ?, post_content = ?, post_date = ?, user_id = ?
        WHERE post_id = ?
    `
    await con.query(sql, [post.title, post.content, post.date, post.user_id, post_id]);
    return await getPost(post_id);
}

async function deletePost(post_id) {
    let sql = `
        DELETE FROM POSTS 
        WHERE post_id = ?;
    `
    return await con.query(sql, [post_id])
}

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost }
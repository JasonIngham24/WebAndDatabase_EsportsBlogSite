const con = require("./db_connect")
const bcrypt = require("bcrypt")

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
    return await con.query(sql)
}

async function getUser(username) {
    let sql = `
      SELECT * FROM USERS
      WHERE user_name = ?
    `
    return await con.query(sql, [username])
}

async function userExists(email){
  let sql = `
    SELECT * FROM USERS
    WHERE user_email = ?`

    let cuser = await con.query(sql, [email])
    return cuser[0]
}

async function register(user){
  let cuser = await userExists(user.email)
  if(cuser) throw new Error("User already exists")
  
    let hasedPassword = await bcrypt.hash(user.password, 10)
    let sql = `
      INSERT INTO USERS (user_first_name, user_last_name, user_name, user_email, user_password)
      VALUES (?, ?, ?, ?, ?)`
    await con.query(sql, [user.firstName, user.lastName, user.username, user.email, hasedPassword])

    return await userExists(user.email)
}

async function login(user){
  let cuser = await userExists(user.email)
  if(!cuser) throw new Error("User does not exist")
  
  let match = await bcrypt.compare(user.password, cuser.user_password)
  if(!match) throw new Error("Incorrect password")

  return cuser
}

async function deleteUser(userId){
    let sql = `
      DELETE FROM USERS
      WHERE user_id = ?`
    await con.query(sql, [userId])
}

async function updateUser(userId, user){
    let sql = `
      UPDATE USERS
      SET user_first_name = ?, user_last_name = ?, user_name = ?, user_email = ?
      WHERE user_id = ?`
    await con.query(sql, [user.firstName, user.lastName, user.username, user.email, userId]);
    let updatedUser = await con.query("SELECT * FROM USERS WHERE user_id = ?", [userId]);
    return updatedUser[0];
}

async function updatePassword(userId, passwords){
    const { oldPassword, newPassword } = passwords;
    let user = await con.query("SELECT * FROM USERS WHERE user_id = ?", [userId]);
    if(!user[0]) throw new Error("User not found");

    let match = await bcrypt.compare(oldPassword, user[0].user_password);
    if(!match) throw new Error("Incorrect old password");

    let hashedPassword = await bcrypt.hash(newPassword, 10)
    let sql = `
      UPDATE USERS
      SET user_password = ?
      WHERE user_id = ?`
    await con.query(sql, [hashedPassword, userId])
}

module.exports = { getAllUsers, getUser, userExists, login, register, deleteUser, updateUser, updatePassword }
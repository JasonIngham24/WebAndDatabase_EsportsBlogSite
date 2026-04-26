const con = require("./db_connect")

async function createEventTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS EVENTS (
        eventID INT AUTO_INCREMENT PRIMARY KEY,
        event_name VARCHAR(100) NOT NULL,
        event_description VARCHAR(255) NOT NULL,
        event_date DATETIME NOT NULL,
        event_location VARCHAR(255) NOT NULL,
        event_host int NOT NULL,
        CONSTRAINT host_fk FOREIGN KEY (event_host) REFERENCES USERS(user_id)
    );`

    await con.query(sql)
}

createEventTable()

async function getAllEvents() {
    let sql = `
      SELECT * FROM EVENTS;
    `
    await con.query(sql)
}

module.exports = { getAllEvents }
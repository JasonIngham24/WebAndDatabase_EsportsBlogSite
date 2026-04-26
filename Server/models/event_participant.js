const con = require("./db_connect")

async function createParticipantTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS EVENT_PARTICIPANTS (
        eventID INT NOT NULL,
        userID INT NOT NULL,
        CONSTRAINT event_participant_pk PRIMARY KEY (eventID, userID),
        CONSTRAINT event_fk FOREIGN KEY (eventID) REFERENCES EVENTS(eventID),
        CONSTRAINT event_participant_user_fk FOREIGN KEY (userID) REFERENCES USERS(user_id)
    );`

    await con.query(sql)
}

createParticipantTable()

async function getAllParticipants() {
    let sql = `
      SELECT * FROM EVENT_PARTICIPANTS;
    `
    await con.query(sql)
}

module.exports = { getAllParticipants }
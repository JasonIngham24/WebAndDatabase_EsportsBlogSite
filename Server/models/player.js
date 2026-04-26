const con = require("./db_connect")

async function createPlayerTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS PLAYERS (
        teamID int NOT NULL,
        playerID int NOT NULL,
        CONSTRAINT player_pk PRIMARY KEY (teamID, playerID),
        CONSTRAINT team_fk FOREIGN KEY (teamID) REFERENCES TEAMS(teamID),
        CONSTRAINT player_fk FOREIGN KEY (playerID) REFERENCES USERS(user_id)
    );`

    await con.query(sql)
}

createPlayerTable()

async function getAllPlayers() {
    let sql = `
      SELECT * FROM PLAYERS;
    `
    await con.query(sql)
}

module.exports = { getAllPlayers }
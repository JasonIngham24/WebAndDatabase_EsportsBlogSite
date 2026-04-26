const con = require("./db_connect")

async function createTeamTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS TEAMS (
        teamID INT AUTO_INCREMENT PRIMARY KEY,
        team_name VARCHAR(50) NOT NULL UNIQUE,
        team_game VARCHAR(50) NOT NULL,
        team_coach int NOT NULL,
        CONSTRAINT coach_fk FOREIGN KEY (team_coach) REFERENCES USERS(user_id)
    );`

    await con.query(sql)
}

createTeamTable()

async function getAllTeams() {
    let sql = `
      SELECT * FROM TEAMS;
    `
    await con.query(sql)
}

module.exports = { getAllTeams }
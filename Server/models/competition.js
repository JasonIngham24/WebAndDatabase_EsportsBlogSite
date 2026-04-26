const con = require("./db_connect")

async function createCompetitionTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS COMPETITIONS (
        competitionID INT AUTO_INCREMENT PRIMARY KEY,
        competition_name VARCHAR(100) NOT NULL,
        competition_date DATETIME NOT NULL,
        competition_host_team int NOT NULL,
        competition_participating_team int NOT NULL,
        CONSTRAINT competition_host_fk FOREIGN KEY (competition_host_team) REFERENCES TEAMS(teamID),
        CONSTRAINT competition_participating_fk FOREIGN KEY (competition_participating_team) REFERENCES TEAMS(teamID)
    );`

    await con.query(sql)
}

createCompetitionTable()

async function getAllCompetition() {
    let sql = `
      SELECT * FROM COMPETITIONS;
    `
    await con.query(sql)
}

module.exports = { getAllCompetition }
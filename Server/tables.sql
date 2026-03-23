CREATE TABLE IF NOT EXISTS USERS (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_first_name VARCHAR(50) NOT NULL,
  user_last_name VARCHAR(50) NOT NULL,
  user_name VARCHAR(50) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS POSTS (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  post_title VARCHAR(255) NOT NULL,
  post_content TEXT NOT NULL,
  post_date DATETIME NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE IF NOT EXISTS COMMENTS (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  comment_content TEXT NOT NULL,
  comment_date DATETIME NOT NULL,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  CONSTRAINT comment_user_fk FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  CONSTRAINT comment_post_fk FOREIGN KEY (post_id) REFERENCES POSTS(post_id)
);

CREATE TABLE IF NOT EXISTS TEAMS (
  teamID INT AUTO_INCREMENT PRIMARY KEY,
  team_name VARCHAR(50) NOT NULL UNIQUE,
  team_game VARCHAR(50) NOT NULL,
  team_coach int NOT NULL,
  CONSTRAINT coach_fk FOREIGN KEY (team_coach) REFERENCES USERS(user_id)
);

CREATE TABLE IF NOT EXISTS PLAYERS (
  teamID int NOT NULL,
  playerID int NOT NULL,
  CONSTRAINT player_pk PRIMARY KEY (teamID, playerID),
  CONSTRAINT team_fk FOREIGN KEY (teamID) REFERENCES TEAMS(teamID),
  CONSTRAINT player_fk FOREIGN KEY (playerID) REFERENCES USERS(user_id)
);

CREATE TABLE IF NOT EXISTS EVENTS (
  eventID INT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  event_description VARCHAR(255) NOT NULL,
  event_date DATETIME NOT NULL,
  event_location VARCHAR(255) NOT NULL,
  event_host int NOT NULL,
  CONSTRAINT host_fk FOREIGN KEY (event_host) REFERENCES USERS(user_id)
);

CREATE TABLE IF NOT EXISTS EVENT_PARTICIPANTS (
  eventID INT NOT NULL,
  userID INT NOT NULL,
  CONSTRAINT event_participant_pk PRIMARY KEY (eventID, userID),
  CONSTRAINT event_fk FOREIGN KEY (eventID) REFERENCES EVENTS(eventID),
  CONSTRAINT event_participant_user_fk FOREIGN KEY (userID) REFERENCES USERS(user_id)
);

CREATE TABLE IF NOT EXISTS COMPETITIONS (
  competitionID INT AUTO_INCREMENT PRIMARY KEY,
  competition_name VARCHAR(100) NOT NULL,
  competition_date DATETIME NOT NULL,
  competition_host_team int NOT NULL,
  competition_participating_team int NOT NULL,
  CONSTRAINT competition_host_fk FOREIGN KEY (competition_host_team) REFERENCES TEAMS(teamID),
  CONSTRAINT competition_participating_fk FOREIGN KEY (competition_participating_team) REFERENCES TEAMS(teamID)
);
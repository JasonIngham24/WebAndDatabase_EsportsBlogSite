require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const userRoutes = require("./server/routes/user")
app.use("/users", userRoutes)
const PostRoutes = require("./server/routes/post")
app.use("/posts", PostRoutes)
const CommentRoutes = require("./server/routes/comment")
app.use("/comments", CommentRoutes)
const TeamRoutes = require("./server/routes/team")
app.use("/teams", TeamRoutes)
const PlayerRoutes = require("./server/routes/player")
app.use("/players", PlayerRoutes)
const EventRoutes = require("./server/routes/event")
app.use("/events", EventRoutes)
const ParticipantRoutes = require("./server/routes/event_participant")
app.use("/participants", ParticipantRoutes)
const CompetitionRoutes = require("./server/routes/competition")
app.use("/competitions", CompetitionRoutes)

// instead of having a domain name like, www.bestrecipes.com, 
// we are using localhost:3500

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
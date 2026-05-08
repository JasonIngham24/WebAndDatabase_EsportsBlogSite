require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

app.use(function(req,res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next()
})

app.use(express.static(__dirname + "/Client"))
app.get('/', (req, res) => {res.sendFile(__dirname + "/Client/index.html")})

const userRoutes = require("./Server/routes/user")
app.use("/users", userRoutes)
const postRoutes = require("./Server/routes/post")
app.use("/posts", postRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
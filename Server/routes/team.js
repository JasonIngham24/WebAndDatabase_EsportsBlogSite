const express = require("express")
const router = express.Router()
const Team = require("../models/team")

router.get('/getAllTeams', async (req, res) => {
    try {
        const teams = await Team.getAllTeams()
        res.send(teams)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
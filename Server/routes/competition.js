const express = require("express")
const router = express.Router()
const Competition = require("../models/competition")

router.get('/getAllCompetitions', async (req, res) => {
    try {
        const competitions = await Competition.getAllCompetitions()
        res.send(competitions)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
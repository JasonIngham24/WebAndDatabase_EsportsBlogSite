const express = require("express")
const router = express.Router()
const User = require("../models/event_participant")

router.get('/getAllParticipants', async (req, res) => {
    try {
        const participants = await Participant.getAllParticipants()
        res.send(participants)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
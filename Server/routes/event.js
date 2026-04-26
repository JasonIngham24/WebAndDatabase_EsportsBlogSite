const express = require("express")
const router = express.Router()
const Event = require("../models/event")

router.get('/getAllEvents', async (req, res) => {
    try {
        const events = await Event.getAllEvents()
        res.send(events)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
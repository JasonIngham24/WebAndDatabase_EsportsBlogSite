const express = require("express")
const router = express.Router()
const Comment = require("../models/comment")

router.get('/getAllComments', async (req, res) => {
    try {
        const comments = await Comment.getAllComments()
        res.send(comments)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
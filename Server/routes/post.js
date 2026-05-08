const express = require("express")
const router = express.Router()
const Post = require("../models/post")

router.use(express.json());
router
    .get('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.getAllPosts()
        res.send(posts)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
    .get('/getPost/:id', async (req, res) => {
    try {
        const post = await Post.getPost(req.params.id)
        res.send(post)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
    .post('/createPost', async (req, res) => {
    try{
        const post = await Post.createPost(req.body)
        res.send(post)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
    .put('/updatePost/:id', async (req, res) => {
    try{
        const post = await Post.updatePost(req.params.id, req.body)
        res.send(post)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
    .delete('/deletePost/:id', async (req, res) => {
    try{
        const post = await Post.deletePost(req.params.id)
        res.send(post)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router
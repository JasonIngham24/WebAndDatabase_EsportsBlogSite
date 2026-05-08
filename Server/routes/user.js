const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.use(express.json());
router
    .get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.send(users)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
    })
    .get('/getUser', async (req, res) => {
        try {
            const user = await User.getUser(req.body)
            res.send(user)
        } catch(err) {
            res.status(401).send({message: err.message})
        }
    })
    .post('/login', async (req, res) => {
    try{
            const user = await User.login(req.body)
            res.send({...user, password: undefined})
        }catch(err) {
            res.status(401).send({message: err.message})
        }
    })
    .post('/register', async (req, res) => {
        try{
            const user = await User.register(req.body)
            res.send({...user, password: undefined})
        }catch(err) {
            res.status(401).send({message: err.message})
        }
    })
    .delete('/:id', async (req, res) => {
        try{
            await User.deleteUser(req.params.id)
            res.send({success: "User deleted successfully"})
        }catch(err) {
            res.status(401).send({message: err.message})
        }
    })
    .put('/:id', async (req, res) => {
        try {
            const user = await User.updateUser(req.params.id, req.body);
            res.send({...user, password: undefined});
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .put('/password/:id', async (req, res) => {
        try {
            await User.updatePassword(req.params.id, req.body);
            res.send({ message: 'Password updated successfully' });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

module.exports = router
const express = require("express");
const router = express.Router();
const { User } = require('../models/index')

// Get all users
router.get('/', async (req, res) => {
    let data = await User.findAll();
    res.json(data)
})
// Get one user
router.get('/:id', async (req,res) => {
    let data = await User.findByPk(req.params.id);
    res.json(data)
})
// create a new user
router.post('/', async(req, res) => {
    let newUser = await User.create(req.body);
    res.json(newUser)
})
// update a user
router.put('/:id', async (req,res) => {
    let data = await User.update(req.body, {where: {id: req.params.id}});
    res.json(data)
})
//delete a user
router.delete('/:id', async(req, res) => {
    let data = await User.destroy({where: {id: req.params.id}});
    res.json(data)
})
module.exports = router;
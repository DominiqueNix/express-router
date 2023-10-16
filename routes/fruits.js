const express = require("express");
const router = express.Router();
const { Fruit } = require('../models/index');

//get all fruits
router.get('/', async (req,res) => {
    const data = await Fruit.findAll();
    res.json(data)
})
//get one fruit
router.get('/:id', async(req,res) => {
    const data = await Fruit.findByPk(req.params.id)
    res.json(data)
})
//create a new fruit
router.post('/', async(req, res) => {
    const data = await Fruit.create(req.body);
    res.json(data)
})
//update a fruit
router.put('/:id', async(req,res) => {
    const data = await Fruit.update(req.body, {where: {id: req.params.id}})
    res.json(data)
})
//delete a fruit
router.delete('/:id', async(req,res) => {
    const data = await Fruit.destroy({where: {id: req.params.id}})
    res.json(data)
})
module.exports = router
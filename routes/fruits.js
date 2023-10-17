const express = require("express");
const router = express.Router();
const { Fruit } = require('../models/index');
const { check, validationResult } = require('express-validator');

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
router.post('/',[
        check("color").not().isEmpty().trim(), 
        check("name").not().isEmpty().trim(), 
        check("name").isLength({min: 5, max:20})
    ] ,async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else {
      const data = await Fruit.create(req.body);
        res.json(data)  
    } 
    
})
//update a fruit
router.put('/:id',[
        check("color").not().isEmpty().trim(), 
        check("name").not().isEmpty().trim()
    ], async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.array()})
        }else {
            const data = await Fruit.update(req.body, {where: {id: req.params.id}})
            res.json(data)
        }
})
//delete a fruit
router.delete('/:id', async(req,res) => {
    const data = await Fruit.destroy({where: {id: req.params.id}})
    res.json(data)
})
module.exports = router
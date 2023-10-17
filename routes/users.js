const express = require("express");
const router = express.Router();
const { User } = require('../models/index');
const { check, validationResult } = require('express-validator')

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
router.post('/', [
        check("name").not().isEmpty().trim(), 
        check("age").not().isEmpty().trim(), 
        check("name").isLength({min: 5, max:15})
    ], async(req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.json({error: errors.array()})
            } else {
                let newUser = await User.create(req.body);
                res.json(newUser)  
            }
    
})
// update a user
router.put('/:id', [
        check("name").not().isEmpty().trim(), 
        check("age").not().isEmpty().trim()
    ],async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.array()})
        } else {
            let data = await User.update(req.body, {where: {id: req.params.id}});
            res.json(data)
        }
})
//delete a user
router.delete('/:id', async(req, res) => {
    let data = await User.destroy({where: {id: req.params.id}});
    res.json(data)
})
module.exports = router;
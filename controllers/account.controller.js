const express = require('express');
const userService = require('../services/user.service');

const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');
const logger = require('../helpers/logger');

const router = express.Router();

const login = (req,res,next)=> {
    
    userService.authenticateUser(req.body)
        .then(user => {
            res.json(user);
        })
       .catch(err => next(err));
}

const register = (req,res,next)=>{
    logger.info(req.body);
    userService.create(req.body)
    .then(user => res.json(user))
    .catch(next);
}

const logout = (req,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return logger.error(err);
        }
        res.json({status:"00",message:"Logout successfully!!"});
    });

}

////model validations

function validateLoginModel(req,res,next) {

    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    validateRequest(req, next, schema);
}


function validateRegisterModel(req, res, next) {
    const schema = Joi.object({
        password: Joi.string().max(20).required(),
        name: Joi.string().required().max(30),
        phoneNumber: Joi.string().max(11).required(),
        email: Joi.string().email(),

    });
    validateRequest(req, next, schema);
}


router.post('/login', validateLoginModel, login);
router.post('/register', validateRegisterModel, register);
router.get('/logout', logout);


module.exports = router;





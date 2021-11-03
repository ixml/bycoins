const express = require('express');
const plaidService = require('../services/plaid.service');

const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');

const router = express.Router();

const createLinkToken = (req,res,next)=> {
    
    plaidService.createLinkToken(req.user.sub)
    .then(data => {
        res.json(data);
    })
    .catch(next);
}

const exchangeToken = (req,res,next)=> {
    
    plaidService.exchangePublicToken(req.body.public_token,req.user.sub)
    .then(data => {
        res.json(data);
    })
    .catch(next);
}

const getAccounts = (req,res,next)=>{
    console.log("getting account details")
    console.log(req.user.sub)
    plaidService.getAccounts(req.user.sub)
    .then(acc => res.json(acc))
    .catch(next);
}


////model validations

function validateAccountModel(req, res, next) {
    const schema = Joi.object({
        password: Joi.string().max(20).required(),
        name: Joi.string().required().max(30),
        phoneNumber: Joi.string().max(11).required(),
        email: Joi.string().email(),

    });
    validateRequest(req, next, schema);
}

//router.post('/create-link-token', validateAccountModel, addAccount);
router.post('/create-link-token', createLinkToken);
router.post('/exchange-token', exchangeToken);
router.get('/', getAccounts);


module.exports = router;





const express = require('express');
const walletService = require('../services/wallet.service');
const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');
const logger = require('../helpers/logger');

const router = express.Router();

const getWallets = (req,res,next)=>{
    walletService.getWallets(req.user.sub)
    .then(wa => res.json(wa))
    .catch(next);
}

const topUpWallet = (req,res,next)=>{
    walletService.topUpWallet(req.user.sub,req.body.amount)
    .then(wa => res.json(wa))
    .catch(next);
}

router.get('/', getWallets);
router.post('/', topUpWallet);

module.exports = router;





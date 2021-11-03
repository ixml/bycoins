const crypto = require("crypto");
const { VerificationTokenType } = require("../models/constants/enums")
const db = require('../helpers/db');
const bitcoinNodeService = require('./bitcoin-node.service');
const plaidService = require('./plaid.service');



const walletService = {

    createWallet : async function (wallet) {

        const address = await bitcoinNodeService.createAddress();
        console.log(address);
        var wallet = new db.Wallet({
            name:wallet.name,
            userId: wallet.userId,
            code: wallet.code ,
            address: address,
            balance:0
        })

        await wallet.save();
        return wallet;
    },

    topUpWallet : async function (userId,amount) {

        var wallet = await db.Wallet
        .findOne({ userId: userId});

        if(!wallet){
            throw "Wallet record not found";
        }

        //assuming bitcoin price is 60,000;
        // let usdAmount = 60000*amount;

        // const accounts = plaidService.getAccounts(userId);
        // const sufficient = accounts.filter((a)=> a.balances.available >= usdAmount);

        // if(sufficient.length == 0){
        //     throw "Insufficient account balance";
        // }

        const ret = await bitcoinNodeService.sendToAddress(wallet.address,amount);
        if(ret){
            wallet.balance += amount;
        }
        //const balance  = await bitcoinNodeService.getBalance(wallet.address);

        await wallet.save();
        return wallet;
    },

    


    getWallets: async function(userId){
        console.log(userId)
        var wallets = await db.Wallet
        .findOne({ userId: userId});
        console.log(wallets)
        return wallets;
    },
}
module.exports = walletService;
const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.MONGODB_URI || config.connectionString,connectionOptions)
//.catch((er)=>{throw new Error(er)});

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Wallet: require('../models/wallet.model'),
    BankAccount: require('../models/bank-account.model')
};
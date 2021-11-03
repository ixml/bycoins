const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const apiError = require('../exceptions/api-exception');
const logger = require('../helpers/logger');
const walletService = require('../services/wallet.service');



var events = require('events');
var eventEmitter = new events.EventEmitter();

const User = db.User;

module.exports = {
    authenticateUser,
    getAll,
    getById,
    create,
    
};

eventEmitter.on("registered",onRegisteredEvent);


async function authenticateUser({ email, password }) {
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        return await generateToken(user);
    }
    throw new apiError("102","Email or password is invalid");
}

async function generateToken(user){

    const token = jwt.sign({ sub: user.id,email: user.email }, config.jwt_secret, { expiresIn: '1d' });
        return {
            ...user.toJSON(),
            token
        };
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
   
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    if (await User.findOne({ phoneNumber: userParam.phoneNumber })) {
        throw 'Phone number  "' + userParam.phoneNumber + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    //user.createdBy = "anonymous";
    //user.updatedBy = "";

    //user.updatedDate = "";

    await user.save();
    eventEmitter.emit("registered",user);
    return await generateToken(user);
}


async function onRegisteredEvent(user) {

    const wallet = {
        userId : user.id,
        name :"Bitcoin",
        balance : 0.0,
        address : "",
        code  : "btc",
    }

    walletService.createWallet(wallet)
    .then(()=> console.log("wallet created successfully"))
    .catch(errr=> console.log(errr))

    console.log("on registered event");
    console.log(user)
}
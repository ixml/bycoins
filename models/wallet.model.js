const mongoose = require('mongoose');
const { baseModel } = require('../models/base.model');

const schema = baseModel.extend({
    userId: { type: String, required: true },
    name: { type: String, required: true,},
    code: { type: String, required: true},
    address: { type: String},
    balance: { type: Number},
});

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id;
//         delete ret.password;
//     }
// });

module.exports = mongoose.model('Wallet', schema); 
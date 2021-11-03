const mongoose = require('mongoose');
const { baseModel } = require('../models/base.model');

const schema = baseModel.extend({
    userId: { type: String, required: true },
    accountNo: { type: String, },
    bankId: { type: String },
    bankName: { type: String },
    accessToken: { type: String },
    itemId: { type: String },
});

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id;
//         delete ret.password;
//     }
// });

module.exports = mongoose.model('BankAccount', schema);
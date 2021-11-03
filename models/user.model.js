const mongoose = require('mongoose');
const { baseModel,onSave, onUpdate} = require('../models/base.model');
//const Schema = mongoose.Schema;

const schema = baseModel.extend({
    email: { type: String, required: true,unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    verified: { type: Boolean, required: false },
});

//const schema = new Schema();

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

schema.pre('update', function(next) {
    onUpdate(this);
    next();
});

schema.pre('save', function(next) {
    onSave(this);
    next();
});

module.exports = mongoose.model('User', schema); 



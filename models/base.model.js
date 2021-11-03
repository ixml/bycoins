const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BaseSchema = new mongoose.Schema({
 
    createdBy : { type: String},
    updatedBy : { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date }
});

const baseModel = {
    // Extend function
    extend : (obj) => (
        new mongoose.Schema(
        Object.assign({}, BaseSchema.obj, obj)
        )
    )
}

const onUpdate = (model)=>{
    model.updatedBy = "anonymous";
    model.updatedDate = new Date();
}

const onSave = (model)=>{
    model.createdBy = "anonymous";
    model.updatedBy = "";
    model.updatedDate = null;
}

module.exports = {
    baseModel,onUpdate,onSave
};


const { required } = require('joi');
const mongoose = require('mongoose');

const layerScheme = new mongoose.Schema({
    description: {type:String, required:true },
    ingredients: [String]
});

const recipeSchema = new mongoose.Schema({
    name: {type:String, require:true},
    description: String,
    category: {type:String ,required:true},
    prepTime: {type:Number, required:true},
    difficulty: {type:Number, min:1, max:5},
    createdAt: {type:Date,default:Date.now},
    layers: [layerScheme],
    instructions: [String],
    image: String,
    isPrivate:{type:Boolean , default:false},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Recipe', recipeSchema)
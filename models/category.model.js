const { default: mongoose } = require('mongoose');
const momgoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    code: {type: String, required: true, unique:true },
    description: String,
    recipeCount: {type: Number, default: 0 },
    recipes: [{ type:mongoose.Schema.Types.ObjectId, ref:'Recipe' }]
});

module.exports = mongoose.model('Category', categorySchema)
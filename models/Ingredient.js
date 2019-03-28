var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
    name: String
});

ingredientSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'ingredients'
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
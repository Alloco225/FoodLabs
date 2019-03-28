var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    cookTime: Number,
    ingredients:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient'
        }
    ] //,
    // types: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Types'
    //     }
    // ]
});

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
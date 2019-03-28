var router = require('express').Router();

var Ingredient = require('./../models/Ingredient');

router.get('/:ingredient', (req, res) => {
    Ingredient.findOne({ name: req.params.ingredient }).populate('recipes').then(ingredient => {
        if (!ingredient) return res.status(404).send('Ingredient introuvable');

        res.render('ingredients/show.html', {
            ingredient: ingredient,
            recipes: ingredient.recipes
        });
    }, err => console.log(err));
});

module.exports = router;
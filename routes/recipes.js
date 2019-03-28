var router = require('express').Router();

var Recipe = require('../models/Recipe');
// var Type = require('./../models/Type');
var Ingredient = require('./../models/Ingredient');

router.get('/', (req, res) => {
    Recipe.find({}).populate('ingredients').populate('ingredients').then(recipes => {
        res.render('recipes/index.html', { recipes: recipes });
    });
});

router.get('/new', (req, res) => {
    Ingredient.find({}).then(ingredients => {
        var recipe = new Recipe();
        res.render('recipes/edit.html', { recipe: recipe, ingredients: ingredients, endpoint: '/'});
    });
});

router.get('/edit/:id', (req, res) => {
    Ingredient.find({}).then(ingredients => {
        Recipe.findById(req.params.id).then(recipe => {
            res.render('recipes/edit.html', { recipe: recipe, ingredients: ingredients, endpoint: '/' + recipe._id.toString() });
        });
    });
});

router.post('/delete/:id', (req, res) => {
    Recipe.findOneAndRemove({ _id: req.params.id }).then(() => {
        res.redirect('/');
    })
});

router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id).populate('ingredients').then(recipe => {
        res.render('recipes/show.html', { recipe: recipe });
    },
        err => res.status(500).send(err));
});

router.post('/:id?', (req, res) => {
    new Promise((resolve, reject) => {
        if(req.params.id){
            Recipe.findById(req.params.id).then(resolve, reject);
        } else{
            resolve(new Recipe())
        }
    }).then(recipe =>{
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        // recipe.types = req.body.types;
        recipe.ingredients = req.body.ingredients;
        
        if(req.file) recipe.picture = req.file.filename;

        return recipe.save();
    }).then(() =>{
        res.redirect('/');
        }, err => console.log(err));
});

module.exports = router;
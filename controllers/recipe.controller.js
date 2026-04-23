const Recipe = require('../models/recipe.model');

exports.createRecipe = async (req, res) => {
    try {
        const { name, description, category, prepTime, difficulty, layers, instructions, image, isPrivate } = req.body;
        console.log("User ID from token:", req.userId);

        const newRecipe = new Recipe({
            ...req.body,
            owner: req.userId
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('owner', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
};
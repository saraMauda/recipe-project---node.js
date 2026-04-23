const Recipe = require('../models/recipe.model');

exports.createRecipe = async (req, res, next) => {
    try {
        const newRecipe = new Recipe({
            ...req.body,
            owner: req.userId
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        next(error);
    }
};

exports.getAllRecipes = async (req, res, next) => {
    try {
        const { search, category, maxTime } = req.query;
        let query = { isPrivate: false };
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (maxTime) {
            query.prepTime = { $lte: Number(maxTime) };
        }

        const recipes = await Recipe.find(query).populate('owner', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};

exports.updateRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            const error = new Error("Recipe not found");
            error.statusCode = 404;
            return next(error);
        }

        if (recipe.owner.toString() !== req.userId) {
            const error = new Error("You can only update your own recipes");
            error.statusCode = 403;
            return next(error);
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        next(error);
    }
};

exports.deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            const error = new Error("Recipe not found");
            error.statusCode = 404;
            return next(error);
        }

        if (recipe.owner.toString() !== req.userId) {
            const error = new Error("You can only delete your own recipes");
            error.statusCode = 403;
            return next(error);
        }

        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getRecipeById = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('owner', 'username');
        if (!recipe) {
            const error = new Error("Recipe not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
};

exports.getUserRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find({ owner: req.userId });
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};
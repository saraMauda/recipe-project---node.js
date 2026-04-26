const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { validateRecipe } = require('../middlewares/recipe.validator'); // <--- כאן התיקון

router.get('/', recipeController.getAllRecipes);
router.get('/my-recipes', verifyToken, recipeController.getUserRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', verifyToken, validateRecipe, recipeController.createRecipe);
router.put('/:id', verifyToken, validateRecipe, recipeController.updateRecipe);

router.delete('/:id', verifyToken, recipeController.deleteRecipe);

module.exports = router;
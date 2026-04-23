const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, validateRecipe, recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.put('/:id', verifyToken, validateRecipe, recipeController.updateRecipe);
router.delete('/:id', verifyToken, recipeController.deleteRecipe);
outer.get('/my-recipes', verifyToken, recipeController.getUserRecipes);
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
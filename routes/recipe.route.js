const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);

module.exports = router;
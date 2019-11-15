const express = require('express');
const { getRecipes, getRecipe, 
        createRecipe, uploadRecipe,
        removeRecipe
      } = require('../controllers/recipesController');

const Recipes = require('../models/RecipesModel');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
  .get(advancedResults(Recipes), getRecipes)
  .post(protect, createRecipe);
router.route('/:id')
  .get(getRecipe)  
  .put(protect, uploadRecipe)
  .delete(protect, removeRecipe);

module.exports = router;  
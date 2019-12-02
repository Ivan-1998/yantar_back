const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Recipes = require('../models/RecipesModel');

/**
 * @desc Получение списка всех рецептов
 * @route GET /api/v1/recipes
 * @access Public
 */
exports.getRecipes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
/**
 * @desc Получение рецепта по id
 * @route GET /api/v1/recipes/:id
 * @access Public
 * @param {Number} id - id рецепта
 */
exports.getRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipes.findById(req.params.id);

  if (!recipe) {
    return next(new ErrorResponse(`Recipe not found with id of ${req.params.id}`));
  }

  res.status(200).json(recipe);
});
/**
 * @desc Добавление рецепта
 * @route POST /api/v1/recipes
 * @access Private
 */
exports.createRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipes.create(req.body);
  res.status(201).json(recipe);
});
/**
 * @desc Обновление рецепта
 * @route PUT /api/v1/recipes/:id
 * @access Private
 * @param {Number} id - id рецепта
 */
exports.uploadRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!recipe) {
    return next(new ErrorResponse(`Recipe not found with id of ${req.params.id}`));
  }

  res.status(200).json(recipe);
});
/**
 * @desc Удаление рецепта
 * @route DELETE /api/v1/recipes/:id
 * @access Private
 * @param {Number} id - id рецепта
 */
exports.removeRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipes.findByIdAndRemove(req.params.id);

  if (!recipe) {
    return next(new ErrorResponse(`Recipe not found with id of ${req.params.id}`));
  }

  res.status(200).json({ msg: 'Рецепт удален' })
}); 
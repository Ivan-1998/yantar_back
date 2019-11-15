const express = require('express');
const { 
        getProducts, createProducts, 
        getProduct, updateProduct,
        removeProduct
      } = require('../controllers/productsController'); 

const Products = require('../models/ProductsModel');
const advancedResults = require('../middleware/advancedResults');      
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
  .get(advancedResults(Products), getProducts)
  .post(protect, createProducts);
router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, removeProduct);

module.exports = router;
const fs = require('fs');
const mongoose  = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// Load models
const Products = require('./models/ProductsModel');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const products = JSON.parse(fs.readFileSync(`${__dirname}`));
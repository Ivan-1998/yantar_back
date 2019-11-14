const path = require('path');
const express = require('express');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });
// Connect to DB
connectDB();

// Route files
const products = require('./routes/productsRouter');
const news = require('./routes/newsRouter');
const auth = require('./routes/authRouter');
const images = require('./routes/imageRouter');

const app = express();

// Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());

app.use(logger);
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// Mount routers
app.use('/api/v1/products', products);
app.use('/api/v1/news', news)
app.use('/api/v1/auth', auth)
app.use('/api/v1/images', images);
app.use(errorHandler);

// Rate limiting
const limiter = rateLimit({
  window: 10 * 60 * 1000, // 10 mins
  max: 10000
});
app.use(limiter);
app.use(hpp());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server & exit proccess
  server.close(() => process.exit(1));
});
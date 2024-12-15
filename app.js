const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // For handling cross-origin requests
const connectDB = require('./config/db'); // Database connection
const userRoutes = require('./routes/userRoutes');
const answerRoutes = require('./routes/answerRoutes');
const questionRoutes = require('./routes/questionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/classiz_db')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit the process with failure
});

// Import routes
const quizRoutes = require('./routes/quizRoutes');
app.use('/api/quizzes', quizRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

// Start the server
const server = app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
console.error('Unhandled Rejection at:', promise, 'reason:', reason);
server.close(() => {
    process.exit(1); // Exit the process with failure
});
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
console.error('Uncaught Exception:', err);
server.close(() => {
    process.exit(1); // Exit the process with failure
});
});
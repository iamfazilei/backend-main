// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a new quiz
router.post('/', async (req, res) => {
try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
} catch (error) {
    res.status(400).send(error);
}
});

// Get all quizzes
router.get('/', async (req, res) => {
try {
    const quizzes = await Quiz.find();
    res.status(200).send(quizzes);
} catch (error) {
    res.status(500).send(error);
}
});

module.exports = router;
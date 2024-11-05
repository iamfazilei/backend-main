const express = require('express');
const router = express.Router();
const { submitQuiz, Submission } = require('../models/Submission'); // Import both submitQuiz and Submission
const Quiz = require('../models/Quiz');

// Route to handle quiz submission
router.post('/submit-quiz', submitQuiz);

// Route to get all submissions for a quiz
router.get('/quiz/:quizId/submissions', async (req, res) => {
    const { quizId } = req.params;

    try {
        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Find all submissions for the quiz
        const submissions = await Submission.find({ quizId });

        res.status(200).json({ submissions });
    } catch (error) {
        console.error('Error getting submissions:', error);
        res.status(500).json({ message: 'Error getting submissions', error: error.message });
    }
});

module.exports = router;
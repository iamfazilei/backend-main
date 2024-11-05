const mongoose = require('mongoose');

// Define the schema for quiz submissions
const submissionSchema = new mongoose.Schema({
    userEmail: { type: String, required: true }, // Use email instead of userId
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    answers: { type: Map, of: String, required: true },
    score: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now }
});

// Create the model for quiz submissions
const Submission = mongoose.model('Submission', submissionSchema);

// Function to handle quiz submission
const submitQuiz = async (req, res) => {
    const { userEmail, quizId, answers, score } = req.body;

    try {
        // Validate the data
        if (!userEmail || !quizId || !answers || score === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new submission document
        const newSubmission = new Submission({
            userEmail, // Use email instead of userId
            quizId,
            answers,
            score
        });

        // Save the submission to the database
        await newSubmission.save();

        res.status(201).json({ message: 'Quiz submitted successfully', submission: newSubmission });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ message: 'Error submitting quiz', error: error.message });
    }
};

module.exports = { Submission, submitQuiz };
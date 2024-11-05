const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const quizSchema = new mongoose.Schema({
    quiz_title: {
        type: String,
        required: true,
        trim: true
    },
    quiz_desc: {
        type: String,
        required: true,
        trim: true
    },
    quiz_instructions: {
        type: String,
        required: true,
        trim: true
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    },
    timeLimit: {
        hours: {
            type: Number,
            required: true,
            min: 0
        },
        minutes: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        },
        seconds: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    },
    deadline: {
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    passingScore: {
        type: Number,
        required: true,
        min: 0
    },
    attemptsAllowed: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
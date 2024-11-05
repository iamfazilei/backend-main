import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitQuiz = ({ quiz }) => {
    const [answers, setAnswers] = useState(quiz.questions.map(() => ''));
    const [studentName, setStudentName] = useState('');
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/students/submit', {
                studentName,
                quizId: quiz._id,
                answers: answers.map((answer, index) => ({
                    questionId: quiz.questions[index]._id,
                    answer
                }))
            });
            navigate(`/performance/${response.data.submission._id}`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    return (
        <div>
            <h1>{quiz.quiz_title}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Student Name:
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {quiz.questions.map((question, index) => (
                    <div key={question._id}>
                        <p>{question.question}</p>
                        {question.choices.map((choice, choiceIndex) => (
                            <label key={choiceIndex}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={choice}
                                    checked={answers[index] === choice}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {choice}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Quiz</button>
            </form>
        </div>
    );
};

export default SubmitQuiz;
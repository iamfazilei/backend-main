import axios from 'axios'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import '../css/questions_style.css';
import addIcon from './../media/add.svg';
import deleteIcon from './../media/delete.svg'; // Import delete icon

const QuizQuestions = ({ quiz, setQuiz, selectedClass }) => {
    const navigate = useNavigate();

    const handleChange = (e, index, choiceIndex) => {
        const { name, value } = e.target;
        const updatedQuestions = [...quiz.questions];

        if (name.startsWith('choice')) {
            updatedQuestions[index].choices[choiceIndex] = value;
        } else {
            updatedQuestions[index][name] = value;
        }

        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleQuizChange = (e) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
    };

    const addQuestion = () => {
        setQuiz({
            ...quiz,
            questions: [
                ...quiz.questions,
                { question: '', choices: ['', '', '', ''], correct_answer: '', points: '' },
            ],
        });
    };

    const deleteQuestion = (index) => {
        const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const isQuizValid = () => {
        const { quiz_title, quiz_desc, quiz_instructions, questions, timeLimit, deadline, passingScore, attemptsAllowed } = quiz;

        // Check if quiz settings fields are filled
        if (!timeLimit || !timeLimit.hours || !timeLimit.minutes || !timeLimit.seconds || 
            !deadline || !deadline.date || !deadline.time ||
            !passingScore || !attemptsAllowed) {
            return false;
        }

        // Check if all questions are filled
        if (!quiz_title || !quiz_desc || !quiz_instructions || questions.length === 0) {
            return false;
        }

        return questions.every(q => 
            q.question && 
            q.choices.every(choice => choice) && 
            q.correct_answer && 
            q.points
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isQuizValid()) {
            alert("Please fill out all fields before submitting the quiz.");
            return;
        }

        // Prepare the data to send
        const quizData = {
            ...quiz,
            class_id: selectedClass._id,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/quizzes', quizData);
            console.log('Quiz created:', response.data);
            navigate('/quizzes');
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <div className="class-display">
                <p>Selected Class: <strong>{selectedClass.name}</strong></p>
            </div>

            <form onSubmit={handleSubmit} id="quiz-form" className="quiz-form">
                <div className="questions-card">
                    <label htmlFor="quiz-title" className="form-label">Provide the quiz title</label>
                    <input 
                        type="text" 
                        id="quiz-title" 
                        name="quiz_title" 
                        className="input" 
                        placeholder="Quiz Title" 
                        value={quiz.quiz_title} 
                        onChange={handleQuizChange} 
                    />

                    <label htmlFor="quiz-desc" className="form-label">Enter a short description for the quiz</label>
                    <textarea 
                        id="quiz-desc" 
                        name="quiz_desc" 
                        className="textarea" 
                        placeholder="Quiz Description" 
                        value={quiz.quiz_desc} 
                        onChange={handleQuizChange}
                    />

                    <label htmlFor="quiz-instructions" className="form-label">Include any instructions or guidelines</label>
                    <textarea 
                        id="quiz-instructions" 
                        name="quiz_instructions" 
                        className="textarea" 
                        placeholder="Quiz Instructions" 
                        value={quiz.quiz_instructions} 
                        onChange={handleQuizChange}
                    />
                </div>

                {quiz.questions.map((q, index) => (
                    <div className="cardQuestions" key={index}>
                        <div className="question-set">
                            <button type="button" className="btn-delete" onClick={() => deleteQuestion(index)}>
                                <img src={deleteIcon} alt="Delete Icon" />
                            </button>
                            <label htmlFor={`question-${index}`} className="form-label">Provide the question</label>
                            <input 
                                type="text" 
                                id={`question-${index}`} 
                                name="question" 
                                className="input" 
                                placeholder="Question" 
                                value={q.question} 
                                onChange={(e) => handleChange(e, index)} 
                            />

                            <label htmlFor={`choices-${index}`} className="form-label">List of the choices</label>
                            <div id={`choices-${index}`} className="choices">
                                {q.choices.map((choice, choiceIndex) => (
                                    <div className="option-wrapper" key={choiceIndex}>
                                        <input 
                                            type="text" 
                                            name={`choice${choiceIndex + 1}`} 
                                            className="input option" 
                                            placeholder={`Option ${choiceIndex + 1}`} 
                                            value={choice} 
                                            onChange={(e) => handleChange(e, index, choiceIndex)} 
                                        />
                                    </div>
                                ))}
                            </div>

                            <label htmlFor={`correct-answer-${index}`} className="correct-answer-label">Correct Answer:</label>
                            <textarea 
                                id={`correct-answer-${index}`} 
                                name="correct_answer" 
                                className="textarea" 
                                placeholder="Enter correct answer" 
                                value={q.correct_answer} 
                                onChange={(e) => handleChange(e, index)}
                            />

                            <label htmlFor={`points-${index}`} className="points-label">Points:</label>
                            <input 
                                type="number" 
                                id={`points-${index}`} 
                                name="points" 
                                className="input" 
                                placeholder="Enter points" 
                                value={q.points} 
                                onChange={(e) => handleChange(e, index)} 
                            />
                        </div>
                    </div>
                ))}

                <button type="button" className="btn-add" onClick={addQuestion}>
                    <img src={addIcon} alt="Add Icon" />
                </button>

                <button type="submit" className="btn-create">Create</button>
            </form>
        </div>
    );
};

QuizQuestions.propTypes = {
    quiz: PropTypes.shape({
        quiz_title: PropTypes.string,
        quiz_desc: PropTypes.string,
        quiz_instructions: PropTypes.string,
        questions: PropTypes.arrayOf(
            PropTypes.shape({
                question: PropTypes.string,
                choices: PropTypes.arrayOf(PropTypes.string),
                correct_answer: PropTypes.string,
                points: PropTypes.number,
            })
        ),
        timeLimit: PropTypes.shape({
            hours: PropTypes.number,
            minutes: PropTypes.number,
            seconds: PropTypes.number,
        }),
        deadline: PropTypes.shape({
            date: PropTypes.string,
            time: PropTypes.string,
        }),
        passingScore: PropTypes.number,
        attemptsAllowed: PropTypes.number,
    }).isRequired,
    setQuiz: PropTypes.func.isRequired,
    selectedClass: PropTypes.object.isRequired,
};

export default QuizQuestions;
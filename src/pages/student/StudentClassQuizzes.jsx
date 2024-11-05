        import React, { useState, useEffect } from 'react';
        import PropTypes from 'prop-types';
        import '../../css/InstructorQuizzes.css';
        import { FaFilter } from 'react-icons/fa'; 
        import calendarIcon from '../../media/calendar.svg';
        import StudentQuizOverview from '../../component/StudentQuizOverview'; 
        import 'react-toastify/dist/ReactToastify.css';
        
        const ClassQuizzes = ({ selectedClass, onBack, onQuizUpdateSuccess }) => {
            const [quizzes, setQuizzes] = useState([]);
            const [dropdownVisible, setDropdownVisible] = useState(false);
            const [selectedQuiz, setSelectedQuiz] = useState(null); // State to manage selected quiz
        
            const fetchQuizzes = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/quizzes?class_id=${selectedClass._id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setQuizzes(data);
                    } else {
                        console.error('Error fetching quizzes:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching quizzes:', error);
                }
            };
        
            useEffect(() => {
                fetchQuizzes();
                const intervalId = setInterval(fetchQuizzes, 60000); // Fetch quizzes every 60 seconds
        
                return () => clearInterval(intervalId); // Clear interval on component unmount
            }, [selectedClass]);
        
            const toggleDropdown = () => {
                setDropdownVisible(!dropdownVisible);
            };
        
            const handleQuizClick = (quiz) => {
                setSelectedQuiz(quiz); // Set the selected quiz to render StudentQuizOverview
            };
        
            const handleQuizUpdate = (updatedQuiz) => {
                setQuizzes((prevQuizzes) =>
                    prevQuizzes.map((quiz) => (quiz._id === updatedQuiz._id ? updatedQuiz : quiz))
                );
                setSelectedQuiz(null); // Close the StudentQuizOverview component
                fetchQuizzes(); // Fetch the latest quizzes after an update
                if (onQuizUpdateSuccess) {
                    onQuizUpdateSuccess(updatedQuiz); 
                }
            };
        
            if (selectedQuiz && selectedQuiz._id) {
                return (
                    <StudentQuizOverview 
                        quiz={selectedQuiz} 
                        onBackClick={() => setSelectedQuiz(null)} 
                        onQuizUpdate={handleQuizUpdate} // Pass the handleQuizUpdate function
                    />
                );
            }
        
            return (
                <div id='instructor-quiz' >
                    <div className="button-container">
                        <div className="dropdown">
                        <button className="button" onClick={onBack}>Back</button>
                            {dropdownVisible && (
                                <div className="dropdown-menu">
                                <button className="dropdown-item">Public</button>
                                <button className="dropdown-item">Private</button>
                        </div>
                        )}
                    </div>
                    <header className="header">
                        <button className="button">Upcoming</button>
                        <button className="button">Incomplete</button>
                        <button className="button">Completed</button>
                    </header>
                </div>
                    
        
                    <hr className="divider" />
        
                    <div className="quiz-list">
                        {quizzes.map((quiz, index) => (
                            <button className="student-quiz-card" key={index} onClick={() => handleQuizClick(quiz)}>
                                <div className="class-initials-card">
                                    {selectedClass.name.split(' ').map(word => word[0]).join('')}
                                </div>
                                <div className="quiz-wrapper">
                                    <div className="details-wrapper">
                                        <h2 className="quiz-title">{quiz.quiz_title}</h2>
                                        <div className="student-card-divider" />
                                        {quiz.deadline && (
                                            <div className="date-wrapper">
                                                <img src={calendarIcon} alt="Calendar Icon" className="calendar-image icon" />
                                                <p className="due-date">
                                                    Due Date: {new Date(`${quiz.deadline.date}T${quiz.deadline.time}`).toLocaleString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                        <p className="course-code">Description: {selectedClass.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            );
        };
        
        ClassQuizzes.propTypes = {
            selectedClass: PropTypes.object.isRequired,
            onBack: PropTypes.func.isRequired,
            onQuizUpdateSuccess: PropTypes.func, // Add new prop type
        };
        
        export default ClassQuizzes;
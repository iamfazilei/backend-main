
import React, { useState } from 'react';
import '../../css/InstructorQuizzes.css';
import { FaFilter } from 'react-icons/fa'; 
import calendarIcon from '../../media/calendar.svg';
import quizOverviewIcon from '../../media/quiz_overview.svg';
import studentRecordIcon from '../../media/records.svg';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([
        {
            quiz_title: "Sample Quiz 1",
            due_date: "2023-12-31T23:59:59Z",
            section: "A1"
        },
        {
            quiz_title: "Sample Quiz 2",
            due_date: "2024-01-15T23:59:59Z",
            section: "B2"
        }
    ]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div id='instructor-quiz' className="container">
            <header className="header">
                <button className="button">Upcoming</button>
                <button className="button">Incomplete</button>
                <button className="button">Completed</button>

                <div className="dropdown">
                    <button className="button dropdown-button" onClick={toggleDropdown}>
                        <FaFilter className="filter-icon" /> Filter
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item">Public</button>
                            <button className="dropdown-item">Private</button>
                        </div>
                    )}
                </div>
            </header>

            <hr className="divider" />

            <div className="quiz-list">
                {quizzes.map((quiz, index) => (
                    <div className="quiz-card" key={index}>
                        <div className="quiz-wrapper">
                            <div className="details-wrapper">
                                <h2 className="quiz-title">{quiz.quiz_title}</h2>
                                <hr />
                                <div className="date-wrapper">
                                    <img src={calendarIcon} alt="Calendar Icon" className="image icon" />
                                    <p className="due-date">
                                        Due Date: {new Date(quiz.due_date).toLocaleString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <p className="course-code">Section: {quiz.section}</p>
                            </div>
                        </div>

                        <div className="quiz-details">
                            <div className="quiz-section">
                                <div className="quiz-image-holder">
                                    <img src={quizOverviewIcon} alt="Quiz Overview" className="quiz-overview" />
                                </div>
                                <div className="description-holder">
                                     Quiz Overview
                                    <p className="description">Toggle between Preview Mode to view the quiz and Edit Mode to modify questions and settings in the same tab.</p>
                                </div>
                            </div>
                            <div className="quiz-section">
                                <div className="quiz-image-holder">
                                    <img src={studentRecordIcon} alt="Student Record" className="student-record" />
                                </div>
                                <div className="description-holder">
                                    Student Records
                                    <p className="description">Displays overall scores, and performance analytics for the selected quiz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quizzes;

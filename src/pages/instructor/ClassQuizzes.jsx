import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../css/InstructorQuizzes.css';
import { FaFilter } from 'react-icons/fa'; 
import calendarIcon from '../../media/calendar.svg';
import quizOverviewIcon from '../../media/quiz_overview.svg';
import studentRecordIcon from '../../media/records.svg';
import EditActivity from './EditActivity'; // Import EditActivity component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizResults from '../../component/QuizResults'; // Import QuizResults component

const ClassQuizzes = ({ selectedClass, onBack, onQuizUpdateSuccess }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null); // State to manage selected quiz
    const [showResults, setShowResults] = useState(false); // State to manage results view
    const [categorizedQuizzes, setCategorizedQuizzes] = useState({
        upcoming: [],
        pastDue: [],
        completed: []
    });
    const [selectedCategory, setSelectedCategory] = useState('upcoming'); // State to manage selected category

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
                categorizeQuizzes(data);
            } else {
                console.error('Error fetching quizzes:', data.error);
            }
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const fetchSubmissions = async (quizId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/quiz/${quizId}/submissions`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.error(`Submissions not found for quiz ID: ${quizId}`);
                    return [];
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching submissions:', errorData.error);
                    return [];
                }
            }

            const data = await response.json();
            console.log(`Fetched submissions for quiz ID ${quizId}:`, data); // Debugging log

            const submissions = data.submissions;
            if (!Array.isArray(submissions)) {
                console.error('Error: Expected submissions to be an array');
                return [];
            }

            // Return distinct student submissions
            const distinctSubmissions = Array.from(new Set(submissions.map(submission => submission.userEmail)))
                .map(email => submissions.find(submission => submission.userEmail === email));
            console.log(`Distinct submissions for quiz ID ${quizId}:`, distinctSubmissions); // Debugging log

            return distinctSubmissions;
        } catch (error) {
            console.error('Error fetching submissions:', error);
            return [];
        }
    };

      const categorizeQuizzes = async (quizzes) => {
        const upcoming = [];
        const pastDue = [];
        const completed = [];
    
        for (const quiz of quizzes) {
            const submissions = await fetchSubmissions(quiz._id);
            console.log(`Submissions count for quiz ID ${quiz._id}:`, submissions.length); // Debugging log
    
            const totalStudents = selectedClass.students.length;
            const submittedStudents = submissions.length;
            const now = new Date();
            const deadline = new Date(`${quiz.deadline.date}T${quiz.deadline.time}`);
    
            if (submittedStudents === totalStudents) {
                completed.push({ ...quiz, submissionsCount: submissions.length });
            } else if (deadline > now) {
                upcoming.push({ ...quiz, submissionsCount: submissions.length });
            } else {
                pastDue.push({ ...quiz, submissionsCount: submissions.length });
            }
        }
    
        setCategorizedQuizzes({ upcoming, pastDue, completed });
    };

    useEffect(() => {
        fetchQuizzes();
    }, [selectedClass]);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleQuizOverviewClick = (quiz) => {
        setSelectedQuiz(quiz); // Set the selected quiz
    };

    const handleResultsClick = (quiz) => {
        setSelectedQuiz(quiz);
        setShowResults(true);
    };

    if (selectedQuiz && showResults) {
        return <QuizResults quizId={selectedQuiz._id} />;
    }

    const handleQuizUpdate = (updatedQuiz) => {
        setQuizzes((prevQuizzes) =>
            prevQuizzes.map((quiz) => (quiz._id === updatedQuiz._id ? updatedQuiz : quiz))
        );
        setSelectedQuiz(null); // Close the EditActivity component
        fetchQuizzes(); // Fetch the latest quizzes after an update
        toast.success('Quiz updated successfully!', {
            className: 'custom-toast'
        });
        if (onQuizUpdateSuccess) {
            onQuizUpdateSuccess(updatedQuiz); 
        }
    };

    if (selectedQuiz) {
        return (
            <>
                <EditActivity onBackClick={() => setSelectedQuiz(null)} selectedClass={selectedClass} quiz={selectedQuiz} onQuizUpdate={handleQuizUpdate} />
                <ToastContainer />
            </>
        );
    }

    return (
        <div id='instructor-quiz' >
            <header className="header">
                <button className="button" onClick={onBack}>Back</button>
                <button className="button" onClick={() => setSelectedCategory('upcoming')}>Upcoming</button>
                <button className="button" onClick={() => setSelectedCategory('pastDue')}>Incomplete</button>
                <button className="button" onClick={() => setSelectedCategory('completed')}>Completed</button>
            </header>

            <hr className="divider" />

            <div className="quiz-list">
                {selectedCategory === 'upcoming' && (
                    <>
                        {categorizedQuizzes.upcoming.map((quiz, index) => (
                            <div className="quiz-card" key={index}>
                                <div className="quiz-wrapper">
                                    <div className="details-wrapper">
                                        <h2 className="quiz-title">
                                            {quiz.quiz_title} ({quiz.submissionsCount}/{selectedClass.students.length})
                                        </h2>
                                        <div className="card-divider" />
                                        {quiz.deadline && (
                                            <div className="date-wrapper">
                                                <img src={calendarIcon} alt="Calendar Icon" className="image icon" />
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

                                <div className="quiz-details">
                                    <button className="quiz-section" onClick={() => handleQuizOverviewClick(quiz)}>
                                        <div className="quiz-image-holder">
                                            <img src={quizOverviewIcon} alt="Quiz Overview" className="quiz-overview" />
                                        </div>
                                        <div className="description-holder">
                                             Quiz Overview
                                            <p className="description">Toggle between Preview Mode to view the quiz and Edit Mode to modify questions and settings in the same tab.</p>
                                        </div>
                                    </button >

                                    <button className="quiz-section" onClick={() => handleResultsClick(quiz)}>
                                        <div className="quiz-image-holder">
                                            <img src={studentRecordIcon} alt="Student Record" className="student-record" />
                                        </div>
                                        <div className="description-holder">
                                            Student Records
                                            <p className="description">Displays overall scores, and performance analytics for the selected quiz.</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {selectedCategory === 'pastDue' && (
                    <>
                        {categorizedQuizzes.pastDue.map((quiz, index) => (
                            <div className="quiz-card" key={index}>
                                <div className="quiz-wrapper">
                                    <div className="details-wrapper">
                                        <h2 className="quiz-title">
                                            {quiz.quiz_title} ({quiz.submissionsCount}/{selectedClass.students.length})
                                        </h2>
                                        <div className="card-divider" />
                                        {quiz.deadline && (
                                            <div className="date-wrapper">
                                                <img src={calendarIcon} alt="Calendar Icon" className="image icon" />
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

                                <div className="quiz-details">
                                    <button className="quiz-section" onClick={() => handleQuizOverviewClick(quiz)}>
                                        <div className="quiz-image-holder">
                                            <img src={quizOverviewIcon} alt="Quiz Overview" className="quiz-overview" />
                                        </div>
                                        <div className="description-holder">
                                             Quiz Overview
                                            <p className="description">Toggle between Preview Mode to view the quiz and Edit Mode to modify questions and settings in the same tab.</p>
                                        </div>
                                    </button >

                                    <button className="quiz-section" onClick={() => handleResultsClick(quiz)}>
                                        <div className="quiz-image-holder">
                                            <img src={studentRecordIcon} alt="Student Record" className="student-record" />
                                        </div>
                                        <div className="description-holder">
                                            Student Records
                                            <p className="description">Displays overall scores, and performance analytics for the selected quiz.</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {selectedCategory === 'completed' && (
                    <>
                        {categorizedQuizzes.completed.map((quiz, index) => (
                            <div className="quiz-card" key={index}>
                                <div className="quiz-wrapper">
                                    <div className="details-wrapper">
                                        <h2 className="quiz-title">
                                            {quiz.quiz_title} ({quiz.submissionsCount}/{selectedClass.students.length})
                                        </h2>
                                        <div className="card-divider" />
                                        {quiz.deadline && (
                                            <div className="date-wrapper">
                                                <img src={calendarIcon} alt="Calendar Icon" className="image icon" />
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

                                <div className="quiz-details">
                                    <button className="quiz-section" onClick={() => handleQuizOverviewClick(quiz)}>
                                        <div className="quiz-image-holder">
                                            <img src={quizOverviewIcon} alt="Quiz Overview" className="quiz-overview" />
                                        </div>
                                        <div className="description-holder">
                                             Quiz Overview
                                            <p className="description">Toggle between Preview Mode to view the quiz and Edit Mode to modify questions and settings in the same tab.</p>
                                        </div>
                                    </button >

                                    <button className="quiz-section" onClick={() => handleResultsClick(quiz)}>
                                        <div className="quiz-image-holder">
                                            <img src={studentRecordIcon} alt="Student Record" className="student-record" />
                                        </div>
                                        <div className="description-holder">
                                            Student Records
                                            <p className="description">Displays overall scores, and performance analytics for the selected quiz.</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

ClassQuizzes.propTypes = {
    selectedClass: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onQuizUpdateSuccess: PropTypes.func, // Add new prop type
};

export default ClassQuizzes;
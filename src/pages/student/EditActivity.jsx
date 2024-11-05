import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditQuestion from '../../component/EditQuestion'; // Import EditQuestion
import QuizSettings from '../../component/QuizSettings';
import QuizOverview from '../../component/QuizOverview';
import axios from 'axios';
import questionIcon from './../../media/question.svg';
import settingsIcon from './../../media/settings.svg';
import previewIcon from './../../media/preview.svg';
import editIcon from './../../media/edit.svg';
import backIcon from './../../media/back.svg';

import '../../css/CreateActivity.css';
import '../../css/settings_style.css';

const EditActivity = ({ onBackClick, selectedClass, quiz: initialQuiz, onQuizUpdate }) => {
  const [activeComponent, setActiveComponent] = useState('questions');
  const [quiz, setQuiz] = useState(initialQuiz || {
    quiz_title: '',
    quiz_desc: '',
    quiz_instructions: '',
    class_id: selectedClass._id, // Ensure class ID is set
    questions: [
      {
        question: '',
        choices: ['', '', '', ''],
        correct_answer: '',
        points: '',
      },
    ],
    timeLimit: { hours: '', minutes: '', seconds: '' },
    deadline: { date: '', time: '' },
    passingScore: '',
    attemptsAllowed: '',
  });

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/quizzes/${quiz._id}`, quiz);
      console.log('Quiz updated:', response.data);
      // onQuizUpdate(response.data); // Notify parent component about the update
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div id="create-activity">
      <h2>{selectedClass.name}</h2> {/* Display the class name */}
      <div className="btn-group">
        <button className="back-btn" onClick={onBackClick}>
          <img src={backIcon} alt="Back Icon" />
        </button>
        <button
          className={`btn-primary ${activeComponent === 'questions' ? 'active' : ''}`}
          onClick={() => handleButtonClick('questions')}
        >
          <img src={questionIcon} alt="Question Icon" className="btn-primary-icon" />
          Questions
        </button>
        <button
          className={`btn-primary ${activeComponent === 'settings' ? 'active' : ''}`}
          onClick={() => handleButtonClick('settings')}
        >
          <img src={settingsIcon} alt="Settings Icon" className="btn-primary-icon" />Settings
        </button>
      </div>
      <div className="icon-group">
        <button
          className={`btn-icon-preview ${activeComponent === 'overview' ? 'active' : ''}`}
          onClick={() => handleButtonClick('overview')}
        >
          <img src={previewIcon} alt="Eye Icon" />
        </button>
        <button
          className={`btn-icon-edit ${activeComponent === 'questions' ? 'active' : ''}`}
          onClick={() => handleButtonClick('questions')}
        >
          <img src={editIcon} alt="Edit Icon" />
        </button>
      </div>
      <div className="main-content">
        {activeComponent === 'questions' && (
          <EditQuestion quiz={quiz} setQuiz={setQuiz} selectedClass={selectedClass} onQuizUpdate={onQuizUpdate} />
        )}
        {activeComponent === 'settings' && (
          <QuizSettings quiz={quiz} setQuiz={setQuiz} />
        )}
        {activeComponent === 'overview' && <QuizOverview quiz={quiz} />}
      </div>
      <button onClick={handleSave} className="btn-save">Save</button>
    </div>
  );
};

EditActivity.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  selectedClass: PropTypes.object.isRequired, // Ensure selectedClass is required
  quiz: PropTypes.object, // Quiz can be null or an object
  onQuizUpdate: PropTypes.func.isRequired, // Add prop type for onQuizUpdate
};

export default EditActivity;
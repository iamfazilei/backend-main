import React, { useState } from 'react';
import PropTypes from 'prop-types';
import backIcon from '../media/back.svg';
import activityIcon from '../media/activity.svg';
import quizIcon from '../media/quiz.svg';
import examIcon from '../media/exam.svg';
import '../css/class_content.css';
import CreateActivity from '../pages/instructor/CreateActivity';

const ClassContent = ({ classItem, onBackClick }) => {
  const [showCreateActivity, setShowCreateActivity] = useState(false);

  const handleCreateActivityClick = () => {
    setShowCreateActivity(true);
  };

  const handleBackClick = () => {
    setShowCreateActivity(false);
  };

  return (
    <div id='class-content' className="class-content-container">
      {showCreateActivity ? (
        <CreateActivity onBackClick={handleBackClick} />
      ) : (
        <>
          <div className="header-content">
            <button className="back-btn" onClick={onBackClick}>
              <img src={backIcon} alt="Back Icon" />
            </button>
            <div className="title-container">
              <h1 className="title">{classItem.name}</h1>
              <hr className="divider" />
            </div>
          </div>
          <button className="create-btn" onClick={handleCreateActivityClick}>
            <img src={activityIcon} alt="Activity Icon" className="activity-icon" /> Create Activity
          </button>
          <div className="assessments">
            <h2 className="subheading">PRIVATE ASSESSMENTS</h2>
            <div className="assessment-list">
              <button className="assessment-btn">
                <img src={quizIcon} alt="Quiz Icon" className="quiz-icon" /> Quizzes
              </button>
              <button className="assessment-btn">
                <img src={examIcon} alt="Exam Icon" className="exam-icon" /> Exams
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ClassContent.propTypes = {
  classItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default ClassContent;
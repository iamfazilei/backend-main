import React from 'react';
import './../css/settings_style.css';
import timerIcon from './../media/timer.svg';
import passingIcon from './../media/passing.svg';
import retryIcon from './../media/retry.svg';

const QuizSettings = ({ quiz, setQuiz }) => {
  const { timeLimit, deadline, passingScore, attemptsAllowed, options } = quiz;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in timeLimit) {
      setQuiz({ ...quiz, timeLimit: { ...timeLimit, [name]: value } });
    } else if (name in deadline) {
      setQuiz({ ...quiz, deadline: { ...deadline, [name]: value } });
    } else if (name === 'passingScore') {
      if (value === '' || (Number.isInteger(Number(value)) && Number(value) >= 0)) {
        setQuiz({ ...quiz, passingScore: value });
      }
    } else if (name === 'attemptsAllowed') {
      if (value === '' || (Number.isInteger(Number(value)) && Number(value) >= 1)) {
        setQuiz({ ...quiz, attemptsAllowed: value });
      }
    }
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setQuiz({ ...quiz, options: { ...options, [name]: checked } });
  };

  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <div id='quiz-setting'>
      <div className="settings-card">
        <h2 className="section-title">General</h2>
        <div className="input-group">
          <div className="title-wrapper">
            <img src={timerIcon} alt="Timer Icon" className="icon" />
            <label className="Category">Time Limit</label>
          </div>
          <div className="time-inputs">
            <input
              type="number"
              className="input-field"
              placeholder="Hours"
              name="hours"
              value={timeLimit.hours}
              min="0"
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Minutes"
              name="minutes"
              value={timeLimit.minutes}
              min="0"
              max="59"
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
            />
            <input
              type="number"
              className="input-field"
              placeholder="Seconds"
              name="seconds"
              value={timeLimit.seconds}
              min="0"
              max="59"
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
            />
          </div>
          <p className="help-text">Set a time limit for completing the quiz or exam</p>
        </div>
        <div className="input-group">
          <label className="Subcategory">Deadline</label>
          <input
            type="date"
            className="input-field"
            name="date"
            value={deadline.date}
            onChange={handleInputChange}
          />
          <input
            type="time"
            className="input-field"
            name="time"
            value={deadline.time}
            onChange={handleInputChange}
          />
          <p className="help-text">Set a deadline for quiz completion</p>
        </div>
        <div className="input-group">
          <div className="title-wrapper">
            <img src={passingIcon} alt="Passing Icon" className="icon" />
            <label className="Category">Passing Score</label>
          </div>
          <input
            type="number"
            className="input-field"
            placeholder="Passing Score"
            name="passingScore"
            value={passingScore}
            min="0"
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
          />
          <p className="help-text">Set a score required to pass the quiz</p>
        </div>
        <div className="input-group">
          <div className="title-wrapper">
            <img src={retryIcon} alt="Retry Icon" className="icon" />
            <label className="Category">Attempts Allowed</label>
          </div>
          <input
            type="number"
            className="input-field"
            placeholder="Attempts Allowed"
            name="attemptsAllowed"
            value={attemptsAllowed}
            min="1"
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
          />
          <p className="help-text">Set the number of attempts allowed for the quiz</p>
        </div>
      </div>
    </div>
  );
};

export default QuizSettings;
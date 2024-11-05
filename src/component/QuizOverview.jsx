import React from 'react';
import PropTypes from 'prop-types';
import '../css/quiz_overview.css';

const QuizOverview = ({ quiz }) => {
  return (
    <div id= 'quiz-overview' className="container">
      <div className="quiz-section">
        <h2>{quiz.quiz_title}</h2>
        <hr />
        <h3>{quiz.quiz_desc}</h3>
        <p>{quiz.quiz_instructions}</p>
      </div>

      {quiz.questions.map((question, index) => (
        <div key={index} className="question-card">
          <h3>{question.question}</h3>

          <div className="options">
            {question.choices.map((choice, choiceIndex) => (
              <label key={choiceIndex} className="radio-label">
                <input
                  type="radio"
                  name={`question${index}`}
                  value={choice}
                />
                <span>{choice}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

QuizOverview.propTypes = {
  quiz: PropTypes.shape({
    quiz_title: PropTypes.string.isRequired,
    quiz_desc: PropTypes.string.isRequired,
    quiz_instructions: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        choices: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default QuizOverview;
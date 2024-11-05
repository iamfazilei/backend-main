import React from 'react';
import IncorrectQuestions from './IncorrectQuestions';
import ScoresBarGraph from './ScoresBarGraph';

const QuizResults = ({ quizId }) => {
    return (
        <div>
            <h1>Quiz Results</h1>
            <ScoresBarGraph quizId={quizId} />
            <IncorrectQuestions quizId={quizId} />
        </div>
    );
};

export default QuizResults;
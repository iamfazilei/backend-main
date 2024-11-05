import axios from 'axios';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PerformanceAnalysis = () => {
    const { submissionId } = useParams();
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response = await axios.get(`/api/students/performance/${submissionId}`);
                setPerformance(response.data);
            } catch (error) {
                console.error('Error fetching performance analysis:', error);
            }
        };

        fetchPerformance();
    }, [submissionId]);

    if (!performance) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: performance.answers.map((answer, index) => `Q${index + 1}`),
        datasets: [
            {
                label: 'Correct',
                data: performance.answers.map(answer => (answer.isCorrect ? 1 : 0)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Incorrect',
                data: performance.answers.map(answer => (!answer.isCorrect ? 1 : 0)),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h1>Performance Analysis</h1>
            <p>Score: {performance.score}</p>
            <p>Accuracy: {performance.accuracy.toFixed(2)}%</p>
            <p>Correct Answers: {performance.correctAnswers}</p>
            <p>Incorrect Answers: {performance.incorrectAnswers}</p>
            <Bar data={data} />
        </div>
    );
};

export default PerformanceAnalysis;
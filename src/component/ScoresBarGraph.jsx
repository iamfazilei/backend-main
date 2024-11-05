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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ScoresBarGraph = ({ quizId }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get(`/api/quizzes/${quizId}/scores`);
                setScores(response.data);
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, [quizId]);

    const data = {
        labels: scores.map(submission => submission.studentName),
        datasets: [
            {
                label: 'Scores',
                data: scores.map(submission => submission.score),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h2>Scores Bar Graph</h2>
            <Bar data={data} />
        </div>
    );
};

export default ScoresBarGraph;
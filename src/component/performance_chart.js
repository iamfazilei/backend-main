const students = [1, 2, 3, 4, 5, 6, 7, 8];
const scores = [85, 92, 78, 88, 91, 95, 83, 100];

const drawBarChart = (canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }

    const chartHeight = 250;
    const chartWidth = 600;
    const barWidth = 40;
    const barSpacing = 20;
    const maxScore = 100;
    const numberOfStudents = students.length;

    const xOffset = 50;
    const yOffset = 50;

    const animateChart = () => {
        ctx.clearRect(0, 0, chartWidth + xOffset, chartHeight + yOffset);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.fillText('Scores', 10, 20);
        
        ctx.fillText('Student ID', chartWidth / 2, chartHeight + 120);
        
        const yLabelStep = 20;
        for (let i = 0; i <= maxScore; i += yLabelStep) {
            const yPosition = chartHeight - (i / maxScore) * chartHeight + yOffset;
            ctx.fillText(i, xOffset - 30, yPosition);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.moveTo(xOffset, yPosition);
            ctx.lineTo(chartWidth + xOffset, yPosition);
            ctx.stroke();
        }

        for (let i = 0; i < numberOfStudents; i++) {
            const barHeight = (scores[i] / maxScore) * chartHeight;
            const x = i * (barWidth + barSpacing) + xOffset;
            const y = chartHeight - barHeight + yOffset;

            ctx.fillStyle = '#574C86';
            ctx.fillRect(x, y, barWidth, barHeight);
            
            ctx.fillStyle = '#ffffff';
            ctx.fillText(students[i], x + 5, chartHeight + 40 + yOffset);
            
            ctx.fillStyle = '#fff';
            ctx.fillText(scores[i], x + 10, y - 10);
        }
    };

    animateChart();
};

export default drawBarChart;
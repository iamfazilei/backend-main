import React, { useEffect } from 'react';
import '../../css/performance_overview.css';
import drawBarChart from '../../component/performance_chart';
import calendarIcon from '../../media/calendar.svg';
import performanceIcon from '../../media/performance.svg';

const HelpSupport = () => {
  useEffect(() => {
    const canvas = document.getElementById('performanceChart');
    if (canvas) {
      drawBarChart(canvas);
    }
  }, []);

  return (
    <div id='instructor-performance-ov' className="perfomance-container">
      <div className="quiz-wrapper">
        <div className="details-wrapper">
          <h1 className="quiz-title">Chemistry</h1>
          <h2 className="quiz-title">Chemistry Quiz 1</h2>
          <hr />
          <div className="date-wrapper">
            <img src={calendarIcon} alt="Calendar Icon" className="image icon" />
            <p className="due-date">Due Date: Sept 20 1:00 PM</p>
          </div>
          <p className="course-code">Section: BSCH2002</p>
        </div>
      </div>

      <div className="performance-overview">
        <div className="image-wrapper">
          <img src={performanceIcon} alt="Performance Overview" className="performance-icon" />
          <h2>Performance Overview</h2>
        </div>
        <div className="chart">
          <canvas id="performanceChart" width="600" height="400"></canvas>
        </div>
      </div>

      <div className="student-list">
        <h2>List of Students</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Submitted</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Swift</td><td>Yes</td><td>85</td></tr>
            <tr><td>2</td><td>Carpenter</td><td>Yes</td><td>92</td></tr>
            <tr><td>3</td><td>Rodrigo</td><td>Yes</td><td>78</td></tr>
            <tr><td>4</td><td>Zefanya</td><td>Yes</td><td>88</td></tr>
            <tr><td>5</td><td>Kim</td><td>Yes</td><td>91</td></tr>
            <tr><td>6</td><td>Vergara</td><td>Yes</td><td>95</td></tr>
            <tr><td>7</td><td>Grande</td><td>Yes</td><td>83</td></tr>
            <tr><td>8</td><td>Roan</td><td>Yes</td><td>100</td></tr>
          </tbody>
        </table>
      </div>

      <div className="student-summary">
        <p><span className="bold">Assigned: </span> 8 students</p>
        <p><span className="bold">Turned-in: </span> 8 students</p>
        <p><span className="bold">Missed: </span> 0 students</p>
      </div>
    </div>
  );
};

export default HelpSupport;

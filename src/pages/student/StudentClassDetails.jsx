import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import personIcon from '../../media/person-icon.svg';
import backIcon from '../../media/back.svg';
import settingsIcon from '../../media/settings.svg';
import activityIcon from '../../media/activity.svg';
import quizIcon from '../../media/quiz.svg';
import examIcon from '../../media/exam.svg';
import '../../css/class_content.css';
import StudentClassQuizzes from './StudentClassQuizzes'; // Import ClassQuizzes

const ClassDetails = ({ selectedClass, onBack, onLeaveSuccess }) => {
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [refresh, setRefresh] = useState(false); // State for triggering refresh
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(false); // State for showing quizzes
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    console.log('Selected class:', selectedClass);
    fetchRegisteredStudents();
  }, [selectedClass, refresh]); 

  // Fetches the list of registered students for the selected class
  const fetchRegisteredStudents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        const registered = data.students.filter(student =>
          selectedClass.students.includes(student.email)
        );
        setRegisteredStudents(registered);
      } else {
        setError(data.error || 'Error fetching registered students');
      }
    } catch (err) {
      console.error('Error fetching registered students:', err);
      setError('An error occurred while fetching registered students.');
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleShowQuizzes = () => {
    setShowQuizzes(true);
  };

  const handleBackFromQuizzes = () => {
    setShowQuizzes(false);
  };

  // Handle opening the modal for leaving the class
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

    // Handle confirming the leave action
  const handleConfirmLeave = async () => {
    if (!selectedClass || !selectedClass._id) {
      setError('Class ID is not available.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/class/${selectedClass._id}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error leaving the class');
        return;
      }
  
      const data = await response.json();
      if (data.success) {
        onLeaveSuccess(); // Trigger the callback to refresh the list of classes
        onBack(); // Go back to the previous screen
      } else {
        setError(data.error || 'Error leaving the class');
      }
    } catch (err) {
      console.error('Error leaving the class:', err);
      setError('An error occurred while leaving the class.');
    }
    handleCloseModal();
  };

  return (
    <div id="class-details">
      {error && <p className="error">{error}</p>}
      {selectedClass && (
        <>
          {showQuizzes ? (
            <StudentClassQuizzes selectedClass={selectedClass} onBack={handleBackFromQuizzes} />
          ) : (
            <>
              <div id="class-details" className="header-content">
                <button className="back-btn" onClick={onBack}>
                  <img src={backIcon} alt="Back Icon"/>
                </button>
                <div className="title-container">
                  <div className="title-row">
                    <h1 className="title">{selectedClass.name}</h1>
                    <button className="settings-btn" onClick={toggleSettings}>
                      <img src={settingsIcon} alt="Settings Icon" />
                    </button>
                  </div>
                  <hr className="divider" />
                  <p className="description"><strong>Description:</strong> {selectedClass.description}</p>
                  {selectedClass.type === 'private' ? (
                    <p className="class-code"><strong>Class Code:</strong> {selectedClass.code}</p>
                  ) : (
                    <p className="class-code"><strong>Class Type:</strong> Public</p>
                  )}
                </div>
              </div>
              {!showSettings && (
                <>
                  <div className="assessments">
                    <h2 className="subheading">PRIVATE ASSESSMENTS</h2>
                    <div className="assessment-list">
                      <button className="assessment-btn" onClick={handleShowQuizzes}>
                        <img src={quizIcon} alt="Quiz Icon" className="quiz-icon" /> Quizzes
                      </button>
                    </div>
                  </div>
                </>
              )}
              {showSettings && (
                <div id="class-details" className="settings-section">
                  <div className="join-class">
                  <button className="remove-btn" onClick={handleOpenModal}>Leave Class</button>

                    <h3 className="colored regtext">Enrolled Students</h3>
                    <table className="enrolled-students-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registeredStudents.length > 0 ? (
                          registeredStudents.map(student => (
                            <tr key={student.email} className="enrolled-student">
                              <td>{`${student.fname} ${student.lname}`}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2">No students enrolled.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <button className="back-to-classdeets" onClick={toggleSettings}>Back to Class Details</button>
                </div>
              )}
            </>
          )}
        </>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to leave the class?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmLeave}>
            Leave
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ClassDetails.propTypes = {
  selectedClass: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onLeaveSuccess: PropTypes.func.isRequired, // Add this line
};

export default ClassDetails;
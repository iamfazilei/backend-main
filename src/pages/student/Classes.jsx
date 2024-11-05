import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import personIcon from '../../media/person-icon.svg';
import '../../css/Classes.css';
import '../../css/CreateClass.css';
import '../../css/studentClasses.css';
import StudentClassDetails from './StudentClassDetails'; // Import ClassDetails component

const StudentClasses = ({ showPrivate, setContent }) => {
  const [classes, setClasses] = useState([]); // All classes
  const [registeredClasses, setRegisteredClasses] = useState([]); // Registered private classes
  const [error, setError] = useState('');
  const [classCode, setClassCode] = useState(''); // State for class code input
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class
  const navigate = useNavigate(); // useNavigate hook
  const [user, setUser] = useState(null);

  // Fetch user details to get the email
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token
          },
        });

        const data = await response.json();
        
        if (data.success) {
          setUser(data.user); // Store user data (including email)
        } else {
          setError(data.error || 'Error fetching user details');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('An error occurred while fetching user details.');
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch all classes
  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/public-classes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        setError(data.error || 'Error fetching classes');
      }

      // Fetch registered classes
      const registeredResponse = await fetch('http://localhost:5000/api/registered-classes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const registeredData = await registeredResponse.json();
      if (registeredData.success) {
        setRegisteredClasses(registeredData.classes);
      } else {
        setError(registeredData.error || 'Error fetching registered classes');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching classes.');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleRegisterClass = async () => {
    if (!classCode) {
      setError('Please enter a class code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register-private-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ classCode }),
      });

      const data = await response.json();
      if (data.success) {
        // Check if the class is already registered
        const isAlreadyRegistered = registeredClasses.some(
          (registeredClass) => registeredClass.id === data.class.id
        );

        if (!isAlreadyRegistered) {
          setRegisteredClasses((prev) => [...prev, data.class]); // Add the newly registered class
        }

        setClassCode(''); // Clear the input field
        setError(''); // Clear any previous errors
        fetchClasses(); // Refresh the list of classes
      } else {
        setError(data.error || 'Error registering for the class');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while registering for the class.');
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('');
  };

  const handleCardClick = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleBackClick = () => {
    setSelectedClass(null);
  };

  const handleLeaveSuccess = () => {
    fetchClasses(); // Refresh the list of classes
  };

  // Filter classes based on the toggle state
  const displayedClasses = showPrivate ? registeredClasses : classes;

  if (selectedClass) {
    return <StudentClassDetails selectedClass={selectedClass} onBack={handleBackClick} onLeaveSuccess={handleLeaveSuccess} />;
  }

   return (
      <div id='classes' className="main-content">
        {error && <p className="error">{error}</p>}
        
        {showPrivate && (
          <div className="section">
            <div className="join-class">
              <h2 className="colored regtext">Enter Class Code to Register for Private Class</h2>
              <div className="input-group">
                <input
                  type="text"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  placeholder="Enter class code"
                />
                <button onClick={handleRegisterClass}>Register</button>
              </div>
            </div>
          </div>
        )}
  
        <div className="section">
          <h2 className="colored">{showPrivate ? 'Private Classes' : 'Public Classes'}</h2>
          {displayedClasses.length === 0 && <p className='no'>No classes available.</p>}
          <div className="grid">
            {displayedClasses.map((classItem, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleCardClick(classItem)}
              >
                <div className="card-image-container">
                  {getInitials(classItem.name)}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{classItem.name}</h3>
                  <hr />
                  <p className='card-description'>{classItem.createdBy.fname} {classItem.createdBy.lname}</p>
                  <p className="card-text">
                    <img
                      src={personIcon}
                      alt="Students Icon"
                      className="icon-image"
                    />
                    {classItem.students.length} Students Enrolled
                  </p>
                </div>
              </div>
            ))}
          </div>
         
        </div>
      </div>
    );
};

StudentClasses.propTypes = {
  showPrivate: PropTypes.bool.isRequired,
  setContent: PropTypes.func.isRequired,
};

export default StudentClasses;
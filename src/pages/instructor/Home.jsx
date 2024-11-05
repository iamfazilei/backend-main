import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import personIcon from '../../media/person-icon.svg';
import '../../css/Home.css';
import ClassDetails from './ClassDetails'; // Import ClassDetails component

const Home = ({ showPrivate, setContent }) => {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.error || 'Error fetching user details');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('An error occurred while fetching user details.');
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/classes', {
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
      } catch (err) {
        console.error('Error:', err);
        setError('An error occurred while fetching classes.');
      }
    };

    fetchUserDetails();
    fetchClasses();
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('');
  };

  const handleClassContentClick = (classItem) => {
    setSelectedClass(classItem); // Set the selected class
  };

  // Filter classes based on the toggle state
  const displayedClasses = classes.filter(classItem => 
    (showPrivate && classItem.type === 'private') || 
    (!showPrivate && classItem.type === 'public')
  );

  if (selectedClass) {
    return (
      <ClassDetails selectedClass={selectedClass} onBack={() => setSelectedClass(null)} />
    );
  }

  return (
    <div id='home-user' className="main-content">
   
        <div className="welcome-card">
          {error && <p className="error">{error}</p>}
          <h2 className="welcome-title">
            Welcome to class<span className="colored">iz</span>, <br />
            <span className='name'>
               {user ? user.fname : ' User'}!
            </span> {/* Display the email if fetched, otherwise display 'User' */}
          </h2>
        </div>

        <div className="grid">
          {displayedClasses.slice(0, 4).map((classItem, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleClassContentClick(classItem)}
            >
              <div className="card-image-container">
                {getInitials(classItem.name)}
              </div>
              <div id='home-user' className="card-content">
                <h3 className="card-title">{classItem.name}</h3>
                <hr />
                <p className='card-description'>{classItem.description}</p>
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
        {displayedClasses.length > 4 && (
          <a href="#" className="nav-link see-more-btn" onClick={() => setContent("Classes")}>
            See more
          </a>
        )}
    </div>
  );
};

Home.propTypes = {
  showPrivate: PropTypes.bool.isRequired,
  setContent: PropTypes.func.isRequired, // Add this prop
};

export default Home;
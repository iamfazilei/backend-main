import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import personIcon from '../../media/person-icon.svg';
import '../../css/Classes.css';
import '../../css/CreateClass.css';
import ClassDetails from './ClassDetails'; // Import ClassDetails component

const Classes = ({ showPrivate }) => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class

  useEffect(() => {
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

    fetchClasses();
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('');
  };

  const handleCardClick = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleBackClick = () => {
    setSelectedClass(null);
  };

  // Filter classes based on the toggle state
  const displayedClasses = classes.filter(classItem =>
    (showPrivate && classItem.type === 'private') ||
    (!showPrivate && classItem.type === 'public')
  );

  if (selectedClass) {
    return <ClassDetails selectedClass={selectedClass} onBack={handleBackClick} />;
  }

  return (
    <div id='classes'  className="main-content">
     
        {error && <p className="error">{error}</p>}
        {displayedClasses.length === 0 && <p>No classes available.</p>}
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
   
    </div>
  );
};

Classes.propTypes = {
  showPrivate: PropTypes.bool.isRequired,
};

export default Classes;
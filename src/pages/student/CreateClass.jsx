import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../css/CreateClass.css';
import publicIcon from '../../assets/chat-text-dynamic-gradient.svg';
import privateIcon from '../../assets/lock-dynamic-gradient.svg';

const CreateClass = () => {
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [classType, setClassType] = useState('private');
  const [students, setStudents] = useState([]); // Store selected students
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRegisteredStudents(data.students);
          setFilteredStudents(data.students);
        } else {
          console.error('Failed to fetch students:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    // Filter students based on the query
    const results = registeredStudents.filter(student => 
      `${student.fname} ${student.lname}`.toLowerCase().includes(query) || 
      student.email.toLowerCase().includes(query)
    );
    setFilteredStudents(results);
  };

  const handleSelectStudent = (student) => {
    // Check if student is already selected
    if (!students.find(s => s.email === student.email)) {
      setStudents(prev => [...prev, { name: `${student.fname} ${student.lname}`, email: student.email }]);
    }
  };

  const handleRemoveStudent = (email) => {
    setStudents(prev => prev.filter(student => student.email !== email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (e.target.checkValidity()) {
      const newClass = {
        name: className,
        description: classDescription,
        type: classType,
        students: students.map(student => student.email), // Use emails for submission
      };

      console.log('Sending class data to server:', newClass);

      fetch('http://localhost:5000/api/create-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newClass),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Class created successfully!");
          // Reset form fields
          setClassName('');
          setClassDescription('');
          setClassType('private');
          setStudents([]); // Reset selected students
          setFilteredStudents(registeredStudents);
        } else {
          alert(`Error: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
        alert('An error occurred while creating the class.');
      });
    }
  };

  return (
    <div id='create-class'>
      <h1>Fill up the form to create a class.</h1>
      <form onSubmit={handleSubmit} className="create-class-container" noValidate>
        <div className="form-group">
          <label htmlFor="className">Class Name</label>
          <input
            type="text"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter class name"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="classDescription">Class Description</label>
          <textarea
            id="classDescription"
            value={classDescription}
            onChange={(e) => setClassDescription(e.target.value)}
            placeholder="Enter class description"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Class Type</label>
          <div className="btn-group">
            <button
              type="button"
              className={`btn ${classType === 'private' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setClassType('private')}
            >
              <img src={privateIcon} alt="Private Icon" className="btn-icon" />
              <div className="btn-text">
                Private
                <span className="btn-subtext">People need permission to join</span>
              </div>
            </button>
            <button
              type="button"
              className={`btn ${classType === 'public' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setClassType('public')}
            >
              <img src={publicIcon} alt="Public Icon" className="btn-icon" />
              <div className="btn-text">
                Public
                <span className="btn-subtext">Anyone can join</span>
              </div>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="additionalInfo">Search a name or email that you want to add to this class</label>
          <input
            type="text"
            id="additionalInfo"
            onChange={handleSearch}
            placeholder="Enter name or email"
            className="form-control"
          />
          {filteredStudents.length > 0 && (
            <ul className="student-search-results">
              {filteredStudents.map(student => (
                <li key={student._id} onClick={() => handleSelectStudent(student)}>
                  {`${student.fname} ${student.lname} (${student.email})`}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="selected-students">
          {students.map(student => (
            <div key={student.email} className="selected-student">
              <span>{student.name}</span>   
              <button onClick={() => handleRemoveStudent(student.email)}>Remove</button>
            </div>
          ))}
        </div>
        <button type="submit" className="center-btn">Add Class</button>
      </form>
    </div>
  );
};

CreateClass.propTypes = {
  addClass: PropTypes.func,
};

export default CreateClass;

import React, { useState } from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Instructor.css'; 
import { Icon } from '@iconify/react';
import homeIcon from '@iconify/icons-heroicons/home-solid';
import classesIcon from '@iconify/icons-icomoon-free/books';
import quizzesIcon from '@iconify/icons-material-symbols/library-books';
import logoutIcon from '@iconify/icons-fluent/person-12-filled';
import helpIcon from '@iconify/icons-fluent/settings-24-filled';
import searchIcon from '@iconify/icons-material-symbols/search';

import Home from './student/Home';
import Classes from './student/Classes';
import CreateActivity from './student/CreateActivity';
import Quizzes from './student/Quizzes';
import Logout from './student/Logout';
import HelpSupport from './student/HelpSupport';
import HeaderSideBar from '../component/HeaderSideBar';

// Sidebar Component
const Sidebar = ({ setContent, setShowPrivate, isSidebarVisible }) => {
  const [isPrivate, setIsPrivate] = useState(true); // Default to showing private classes

  const handleToggleChange = () => {
    setIsPrivate(!isPrivate);
    setShowPrivate(!isPrivate); // Pass the new state to the parent
  };

  return (
    <div id="sidebar" className={`d-flex flex-column flex-shrink-0 p-3 bg-light sidebar ${isSidebarVisible ? 'visible' : 'hidden'} fixed-sidebar`}>
      <p className="navbar-brand classiz">
        class<span style={{ color: '#BA68C8' }}>iz.</span>
      </p>
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item"><h6 className="nav-header">Menu</h6></li>
        <li className="nav-item">
          <a href="#home-student" className="nav-link active" onClick={() => setContent("Home")}>
            <Icon icon={homeIcon} /> Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#classes-student" className="nav-link" onClick={() => setContent("Classes")}>
            <Icon icon={classesIcon} /> Classes
          </a>
        </li>
      
        <li className="nav-item">
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              id="classTypeToggle"
              checked={isPrivate}
              onChange={handleToggleChange}
            />
            <label className="form-check-label" htmlFor="classTypeToggle">
              {isPrivate ? 'Show Private Classes' : 'Show Public Classes'}
            </label>
          </div>
        </li>
        <li className="nav-item"><h6 className="nav-header">Assessment</h6></li>
        <li className="nav-item">
          <a href="#quiz-student" className="nav-link" onClick={() => setContent("Quizzes")}>
            <Icon icon={quizzesIcon} /> Quizzes
          </a>
        </li>
        <li className="nav-item"><h6 className="nav-header">User</h6></li>
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={() => setContent("Logout")}>
            <Icon icon={logoutIcon} /> Logout
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={() => setContent("Help & Support")}>
            <Icon icon={helpIcon} /> Help & Support
          </a>
        </li>
      </ul>

      <div className="input-group mb-3">
        <input 
          type="text" 
          placeholder="   Search" 
          className="form-control" 
          onChange={(e) => setContent(`Search Results for "${e.target.value}"`)} 
        />
        <span className="input-group-text">
          <Icon icon={searchIcon} />
        </span>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setContent: PropTypes.func.isRequired,
  setShowPrivate: PropTypes.func.isRequired, 
  isSidebarVisible: PropTypes.bool.isRequired,
};

const Content = ({ content, classes, addClass, setContent, showPrivate }) => {
  switch(content) {
    case "Home":
      return <Home showPrivate={showPrivate} setContent={setContent} />; // Pass showPrivate and setContent props
    case "Classes":
      return <Classes showPrivate={showPrivate} setContent={setContent} />; // Pass showPrivate and setContent props
    case "Create Activity":
      return <CreateActivity />;
    case "Quizzes":
      return <Quizzes />;
    case "Logout":
      return <Logout />;
    case "Help & Support":
      return <HelpSupport />;
    default:
      return <div>{content}</div>;
  }
};

Content.propTypes = {
  content: PropTypes.string.isRequired,
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      enrollment: PropTypes.number.isRequired,
    })
  ).isRequired,
  addClass: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  showPrivate: PropTypes.bool.isRequired, // Add this prop
};

const App = () => {
  const [content, setContent] = useState("Home");
  const [classes, setClasses] = useState([]);
  const [showPrivate, setShowPrivate] = useState(true); // State to track if private classes should be shown
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const addClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    document.body.classList.toggle('no-scroll', !isSidebarVisible);
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <HeaderSideBar toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1">
        <Sidebar setContent={setContent} setShowPrivate={setShowPrivate} isSidebarVisible={isSidebarVisible} /> {/* Pass the setter function */}
        <div className="main-content flex-grow-1">
          <Content content={content} classes={classes} addClass={addClass} setContent={setContent} showPrivate={showPrivate} /> {/* Pass the showPrivate state */}
        </div>
      </div>
    </div>
  );
};

export default App;
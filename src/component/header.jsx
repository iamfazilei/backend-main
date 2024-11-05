import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-nav">
      <a className="navbar-brand custom-brand" href="#">
        class<span style={{ color: '#BA68C8' }}>iz.</span>
      </a>
      <button className="navbar-toggler custom-button" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/#home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
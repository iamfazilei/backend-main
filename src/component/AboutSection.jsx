import React from 'react';
import aboutImage from '../assets/search.avif';

const AboutSection = () => {
  return (
    <section id="about" className="about-section container">
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={aboutImage} alt="About" className="img-fluid responsive-img" loading="lazy" />
        </div>
        <div className="col-12 col-md-6">
          <div className="gradient-line my-3"></div>
          <h1 className="navbar-brand about-start">Get started!</h1>
          <p className="lead mt-3">
            Want to experience the thrill of knowledge? Create engaging quizzes, gain insights, and embark on this knowledge journey with us? Dive right in!
          </p>
          <div className="d-flex mt-3 regbtn">
            <a href="/register?role=instructor" className="btn btn-primary me-2">Register as Instructor</a>
            <a href="/register?role=student" className="btn btn-primary">Register as Student</a>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12">
          <div className="gradient-classiz my-3"></div>
          <h2 className="why-classiz">Why class<span style={{ color: '#BA68C8' }}>iz?</span></h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <p>
            At classiz, we believe in learning with fun. Our dynamic quiz framework not only feeds your curiosity but also helps you track your growth over time.
          </p>
        </div>
        <div className="col-12 col-md-6">
          <p>
            Our course creators handpick each question, ensuring you tackle real-world problems and keep your grey cells active!
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="c1">
            <div className="content-row">
              <div className="text-content">
                <h1>Student Registered</h1>
                <p>10,000 Bright Minds</p>
              </div>
            </div>
          </div>
          <div className="c2">
            <div className="content-row">
              <div className="text-content">
                <h1>Quizzes and Exams Done</h1>
                <p>10,000+ Questions Answered</p>
              </div>
            </div>
          </div>
          <div className="c3">
            <div className="content-row">
              <div className="text-content">
                <h1>Instructors Onboard</h1>
                <p>500 Knowledge Gurus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

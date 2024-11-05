import React, { Suspense, lazy } from 'react';
import '../css/landingpage.css'; 
import homeImage from '../assets/home.webp'; 
import aboutImage from '../assets/search.webp'; 
import contactImage from '../assets/contact.webp'; 

const Header = lazy(() => import('../component/header'));
// const AboutSection = lazy(() => import('../component/AboutSection')); 
// const ContactSection = lazy(() => import('../component/ContactSection')); 

const LandingPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      
      {/* Preload key images */}
      <link rel="preload" as="image" href={homeImage} />
      <link rel="preload" as="image" href={aboutImage} />
      <link rel="preload" as="image" href={contactImage} />

      {/* Home Section */}
      <section id="home" className="home-section container">
        <div className="row">
          <div className="col-12 col-md-6">
            <a className="navbar-brand classiz" href="/">
              class<span style={{ color: '#BA68C8' }}>iz.</span>
            </a>
            <p className="lead mt-3">
              Ever thought of creating your own world of quizzes? At classiz,
              <span> we turn your imagination to reality!</span>
            </p>
            <div className="gradient-line my-3"></div>
            <p className='second-text'>
              Whether you’re an educator aiming to gauge your students’ progress, or just a trivia buff who loves challenging others, classiz is the place for you!
            </p>
          </div>
          <div className="col-12 col-md-6">
            <img src={homeImage} alt="Home" className="img-fluid" width="600" height="400" loading="eager" />
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <AboutSection />
      </Suspense> */}

      {/* Contact Section */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ContactSection />
      </Suspense> */}

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

       {/* Contact Section */}
       <section id="contact" className="contact-section container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="gradient-contact my-3"></div>
            <h1>Contact Us</h1>
            <p> Feel free to message us!</p>
            <form className="mt-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your Name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Your Email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>    
          </div>
          <div className="col-12 col-md-6">
            <img src={contactImage} alt="Contact" className="img-fluid" width="600" height="400" loading="lazy" />
          </div>
        </div>
        
        <div className="social-icons mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

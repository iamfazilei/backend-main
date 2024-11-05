import React from 'react';
import '../css/landingpage.css'; 
import contactImage from '../assets/contact.avif'; 

const ContactSection = () => {
  return (
    <div>
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
}

export default ContactSection;
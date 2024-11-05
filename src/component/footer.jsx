import React from 'react';
import '../css/footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Classiz. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Make sure to create a Footer.css file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Your App Name. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

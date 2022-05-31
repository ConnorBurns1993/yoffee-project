import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './Footer.css';

function Footer() {
    return (
    <div className='footer-wrapper'>
        <div className='footer-1'>
            <div className='footer-title'>About</div>
            <div className='footer-title'>Discover</div>
            <div className='footer-title'>Connor For Business</div>
        </div>
        <div className='footer-2'>
            <a href='https://www.google.com/gmail/about/' target='_blank' rel="noreferrer" className='footer-content email links'>Email</a>
            <a href='https://github.com/ConnorBurns1993' target='_blank' rel="noreferrer" className='footer-content github links'>GitHub</a>
            <a href='https://www.linkedin.com/in/connor-burns-647766194/' rel="noreferrer" target='_blank' className='footer-content linkedin links'>LinkedIn</a>
        </div>
    </div>
    )
}

export default Footer;

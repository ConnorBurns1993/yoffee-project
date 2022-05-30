import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css';
import Footer from '../Footer';

function HomePage (){
    return (
        <>
        <div className="background-img">
        <h2 className="home-h2">Nothing like that first cup in the morning...</h2>
        <button className="latte-button">
        <i className='fa-solid fa-magnifying-glass magnify2'></i>
            Fresh lattes
        </button>
        <h2 className='recent-activity'>Recent Activity</h2>
        </div>
      <div className='footer-wrapper-home'>
      <div className='footer-1'>
          <div className='footer-title'>About</div>
          <div className='footer-title'>Discover</div>
          <div className='footer-title'>Connor For Business</div>
      </div>
      <div className='footer-2'>
          <a href='https://www.google.com/gmail/about/' target='_blank' className='footer-content email links'>Email</a>
          <a href='https://github.com/ConnorBurns1993' target='_blank' className='footer-content github links'>GitHub</a>
          <a href='https://www.linkedin.com/in/connor-burns-647766194/' target='_blank' className='footer-content linkedin links'>LinkedIn</a>
      </div>
  </div>
  </>

        )
}

export default HomePage;

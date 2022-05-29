import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css';

function HomePage (){
    return (
        <div className="background-img">
        <h2 className="home-h2">Nothing like that first cup in the morning...</h2>
        <button className="latte-button">
        <i className='fa-solid fa-magnifying-glass magnify2'></i>
            Fresh lattes
        </button>
        <h2 className='recent-activity'>Recent Activity</h2>
        </div>

        )
}

export default HomePage;

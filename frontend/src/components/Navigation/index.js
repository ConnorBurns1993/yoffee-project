import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className="login-signup">
        <NavLink to="/login" className='login'>Log In</NavLink>
        <NavLink to="/signup" className='signup'>Sign Up</NavLink>
      </div>
    );
  }

  return (
      <div className="homepage-wrapper">
    <ul>
      <li>
        <NavLink exact to="/" className="home"><img className="homeLogo" src="https://i.imgur.com/WNhN3BB.png" alt=''></img></NavLink>
        <form>
       <input className='searchbar1' type='search' placeholder='mochas, espresso, iced lattes...'></input>
       <input className='searchbar2' type='search' placeholder='Ontario, CA'></input>
       <button className='searchbar-button' type="submit"><i className='fa-solid fa-magnifying-glass magnify'></i></button>
        </form>
        {isLoaded && sessionLinks}
      </li>
    <div className="under-wrapper">
    <div className='under-searchbar-text'>Coffee Shops<i className="fa-solid fa-angle-down angledown"></i></div>
    <div className='under-searchbar-text'>Delivery<i className="fa-solid fa-angle-down angledown"></i></div>
    </div>
    </ul>
    </div>

  );
}

export default Navigation;

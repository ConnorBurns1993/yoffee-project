import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className='logout-wrapper'>
        <img onClick={openMenu} className='profile-picture' alt='' src={`${user.profilePicture}`}></img>
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="settings"><i className='fa-solid fa-gear cog'></i>Account Settings</li>
          <li>
            <button className="logout" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket arrow"></i>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

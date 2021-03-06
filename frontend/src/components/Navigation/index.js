import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }, { isHome }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // useEffect(() => {
  //   history.listen((location) => {
  //     console.log(`You changed the page to: ${location.pathname}`);
  //   });
  // }, [history]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="login-signup">
        <NavLink to="/login" className="login">
          Log In
        </NavLink>
        <NavLink to="/signup" className="signup">
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <div className="homepage-wrapper">
      <ul className={setScrolled ? "navigation scrolled" : "navigation"}>
        <li className="navigation">
          <NavLink exact to="/" className="home">
            <img
              className="homeLogo"
              src="https://i.imgur.com/WNhN3BB.png"
              alt=""
            ></img>
          </NavLink>
          <form>
            <input
              className="searchbar1"
              type="search"
              placeholder="mochas, espresso, iced lattes..."
            ></input>
            <input
              className="searchbar2"
              type="search"
              placeholder="Ontario, CA"
            ></input>
            <button className="searchbar-button" type="submit">
              <NavLink to="/businesses">
                <i className="fa-solid fa-magnifying-glass magnify"></i>
              </NavLink>
            </button>
          </form>
          {isLoaded && sessionLinks}
        </li>
        <div className="under-wrapper">
          <div className="under-searchbar-text">
            Coffee Shops<i className="fa-solid fa-angle-down angledown"></i>
          </div>
          <div className="under-searchbar-text">
            Delivery<i className="fa-solid fa-angle-down angledown"></i>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;

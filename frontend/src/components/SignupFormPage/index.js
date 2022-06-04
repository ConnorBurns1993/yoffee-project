import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, name, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <>
      <div className="mock-header">
        <NavLink exact to="/">
          <img
            src="https://i.imgur.com/WNhN3BB.png"
            className="mock-header-img"
            alt=""
          ></img>
        </NavLink>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="signup-div">
          <h2 className="log-in-to-yoffee">Sign Up for Yoffee</h2>
          <div className="new-to-yoffee1">
            Connect with great local businesses
          </div>
          <div className="tos">
            By continuing, you agree to Yoffee's{" "}
            <NavLink to="/signup" className="links">
              Terms of Service
            </NavLink>{" "}
            and acknowledge Yoffee's{" "}
            <NavLink to="/signup" className="links">
              Privacy Policy.
            </NavLink>
          </div>
          <NavLink exact to="/">
            <button className="demo-user facebook">
              <i className="fa-brands fa-dailymotion demo-icon"></i>Continue
              with Demo User
            </button>
          </NavLink>
          <NavLink exact to="/">
            <button className="demo-user google">
              <i className="fa-brands fa-dailymotion demo-icon goog"></i>
              Continue with Demo User
            </button>
          </NavLink>
          <NavLink exact to="/">
            <button className="demo-user apple">
              <i className="fa-brands fa-dailymotion demo-icon"></i>Continue
              with Demo User
            </button>
          </NavLink>
          <div className="dont-worry">
            Don't worry, we never post without your permission.
          </div>
          <div className="or-wrapper">
            <div className="or-line">_______________</div>
            <div className="or"> OR </div>
            <div className="or-line">_______________</div>
          </div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <input
              className="login-inputs"
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>
              <input
                className="login-inputs"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </label>
          <label>
            <input
              className="login-inputs"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              className="login-inputs"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className="login2" type="submit">
            Sign Up
          </button>
          <div className="new-to-yoffee2">
            Already on Yoffee?
            <NavLink to="/login" className="links new">
              Log In
            </NavLink>
          </div>
        </div>
      </form>
      <img
        className="coffee-art-signup"
        src="https://thumbs.dreamstime.com/b/coffee-latte-art-cup-hand-drawn-vector-illustration-isolated-white-background-178040825.jpg"
        alt=""
      ></img>
      <div className="footer-wrapper-signup">
        <div className="footer-1">
          <div className="footer-title">About</div>
          <div className="footer-title">Discover</div>
          <div className="footer-title">Connor For Business</div>
        </div>
        <div className="footer-2">
          <a
            href="https://www.google.com/gmail/about/"
            target="_blank"
            rel="noreferrer"
            className="footer-content email links"
            alt=""
          >
            Email
          </a>
          <a
            href="https://github.com/ConnorBurns1993"
            target="_blank"
            rel="noreferrer"
            className="footer-content github links"
            alt=""
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/connor-burns-647766194/"
            target="_blank"
            rel="noreferrer"
            className="footer-content linkedin links"
            alt=""
          >
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;

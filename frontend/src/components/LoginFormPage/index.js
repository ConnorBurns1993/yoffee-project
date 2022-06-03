import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className='mock-header'><NavLink exact to='/'><img src='https://i.imgur.com/WNhN3BB.png' alt='' className='mock-header-img'></img></NavLink></div>
      <div className='login-div'>
      <h2 className='log-in-to-yoffee'>Log in to Yoffee</h2>
      <div className='new-to-yoffee1'>New to Yoffee? <NavLink to='/signup' className='links'>Sign up</NavLink></div>
      <div className='tos'>By logging in, you agree to Yoffee's <NavLink to='/login' className='links'>Terms of Service</NavLink> and <NavLink to='/login' className='links'>Privacy Policy.</NavLink></div>
      <NavLink exact to='/'><button className='demo-user facebook'>
      <i className="fa-brands fa-dailymotion demo-icon"></i>Continue with Demo User
      </button></NavLink>
      <NavLink exact to='/'><button className='demo-user google'>
      <i className="fa-brands fa-dailymotion demo-icon goog"></i>Continue with Demo User
      </button></NavLink>
      <NavLink exact to='/'><button className='demo-user apple'>
      <i className="fa-brands fa-dailymotion demo-icon"></i>Continue with Demo User
      </button></NavLink>
      <div className="or-wrapper">
      <div className='or-line'>_______________</div>
      <div className='or'> OR </div>
      <div className='or-line'>_______________</div>
      </div>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        <input
          className='login-inputs'
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        className='login-inputs'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <NavLink to='/login' className='forgot-password links'>Forgot password?</NavLink>
      <button type="submit" className='login2'>Log In</button>
      <div className='new-to-yoffee2'>New to Yoffee?<NavLink to='/signup' className='links new'>Sign up</NavLink></div>
      </div>
    </form>
      <img className='coffee-art' src='https://thumbs.dreamstime.com/b/coffee-latte-art-cup-hand-drawn-vector-illustration-isolated-white-background-178040825.jpg' alt=''></img>
      <div className='footer-wrapper'>
        <div className='footer-1'>
            <div className='footer-title'>About</div>
            <div className='footer-title'>Discover</div>
            <div className='footer-title'>Connor For Business</div>
        </div>
        <div className='footer-2'>
            <a href='https://www.google.com/gmail/about/' target='_blank' rel="noreferrer" className='footer-content email links' alt=''>Email</a>
            <a href='https://github.com/ConnorBurns1993' target='_blank' rel="noreferrer" className='footer-content github links' alt=''>GitHub</a>
            <a href='https://www.linkedin.com/in/connor-burns-647766194/' target='_blank' rel="noreferrer" alt='' className='footer-content linkedin links'>LinkedIn</a>
        </div>
    </div>
      </>
  );
}

export default LoginFormPage;

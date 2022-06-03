import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from './components/HomePage'
import Businesses from "./components/BusinessForm";
import BusinessDetail from './components/BusinessForm/BusinessDetail'
import Navigation from "./components/Navigation";
import AddBusinessForm from "./components/AddBusinessForm";
import Rating from './components/Ratings'
import Reviews from "./components/Reviews";
import { getBusinesses } from "./store/businesses";
import { getReviews } from "./store/reviews";
import { getUsers } from "./store/users";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBusinesses())
  }, [dispatch])

  useEffect(() => {
    dispatch(getReviews())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path='/' exact>
            <HomePage />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path='/businesses' exact>
            <Businesses />
          </Route>

          <Route path='/businesses/create' exact>
            <AddBusinessForm />
          </Route>

          <Route path='/businesses/:businessId' exact>
            <BusinessDetail />
          </Route>


          <Route path='/stars' exact>
            <Rating />
          </Route>

          <Route path='/reviews' exact>
            <Reviews />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;

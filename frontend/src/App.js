import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AddBusinessForm from "./components/AddBusinessForm";
import Businesses from "./components/BusinessForm";
import BusinessDetail from "./components/BusinessForm/BusinessDetail";
import HomePage from "./components/HomePage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Rating from "./components/Ratings";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/businesses" exact>
            <Businesses />
          </Route>

          <Route path="/businesses/create" exact>
            <AddBusinessForm />
          </Route>

          <Route path="/businesses/:businessId" exact>
            <BusinessDetail />
          </Route>

          <Route path="/stars" exact>
            <Rating />
          </Route>

          {/* <Route path='/reviews' exact>
            <Reviews />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;

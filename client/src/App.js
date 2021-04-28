import React, { Component } from "react";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CustomerPrivateRoute from "./components/private-route/CustomerPrivateRoute";
import JobSeekerPrivateRoute from "./components/private-route/JobSeekerPrivateRoute ";
import CustomerDashboard from "./components/private-components/Customers/CustomerHome";
import UpdateCustProfile from "./components/private-components/Customers/UpdateCustProfile";
import SearchWorkers from "./components/private-components/Customers/SearchWorkers";
import SeekersDashboard from "./components/private-components/Seekers/SeekersHome";
import SeekersProfile from "./components/private-components/Seekers/UpdateJSProfile";
import "./App.css";
import LookForWork from "./components/private-components/Seekers/LookForWork";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <CustomerPrivateRoute exact path="/customerdashboard" component={CustomerDashboard} />
              <CustomerPrivateRoute exact path="/customerprofile" component={UpdateCustProfile} />
              <CustomerPrivateRoute exact path="/searchWorkers" component={SearchWorkers} />
              <JobSeekerPrivateRoute exact path="/jobseekerdashboard" component={SeekersDashboard} />
              <JobSeekerPrivateRoute exact path="/jobseekerprofile" component={SeekersProfile} />
              <JobSeekerPrivateRoute exact path="/lookforwork" component={LookForWork} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

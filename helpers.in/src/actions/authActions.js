import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, UPDATE_CURRENT_USER, FETCH_JOB_SEEKERS, FETCH_JOB_PROPOSAL } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateCProfile = (userData, history) => dispatch => {
  axios
    .post("/api/customer/update", userData)
    .then(res => {
      // Set current user
      dispatch(updateCurrentUser(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateJobSProfile = (userData, history) => dispatch => {
  axios
    .post("/api/jobseeker/update", userData)
    .then(res => {
      // Set current user
      dispatch(updateCurrentUser(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const updateCurrentUser = decoded =>{
  return {
    type: UPDATE_CURRENT_USER,
    payload: decoded
  };
}
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const fetchJobSeekers = () => dispatch => {
  axios
    .get("/api/customer/fetchJobSeekers")
    .then(res => {
      // Set current user
      res.data.map(element => dispatch(fetchJobSeekersSuccess(element)));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const fetchJobSeekersSuccess = decoded =>{
  console.log(decoded);
  return{
    type : FETCH_JOB_SEEKERS,
    payload : decoded
  }
}

export const fetchJobProposals = (userData) => dispatch => {
  const req={
    _id: userData
  }
  axios
    .post("/api/jobseeker/fetchJobProposals",req)
    .then(res => {
      // Save to localStorage
      console.log("Data in authaction fetch: "+ JSON.stringify(res.data));
      // Set current user
      res.data.map(element => dispatch(fetchJobProposalsSuccess(element)));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const fetchJobProposalsSuccess = decoded =>{
  console.log(decoded);
  return{
    type : FETCH_JOB_PROPOSAL,
    payload : decoded
  }
}
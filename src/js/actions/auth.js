import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
} from './types';

// Dependency libraries
import { browserHistory } from 'react-router';
import axios from 'axios';
// Import the url of our API
import API_URL from './api'

//
export function signinUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${API_URL}/login`, { email, password })
    .then(response => {
      // update state to indicate user is auth'd
      dispatch({ type: AUTH_USER });
      // save the jwt token
      localStorage.setItem('token', response.data.token);
      // redirect route to '/dashboard'
      browserHistory.push('/dashboard')
    })
    .catch(function(err) {
      // If bad request, show error
      dispatch(authError('Bad login info'))
    });
  }
}

//
export function signUpUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${API_URL}/signup`, { email, password })
    .then(response => {
      // update state to indicate user is auth'd
      dispatch({ type: AUTH_USER });
      // save the jwt token
      localStorage.setItem('token', response.data.token);
      // redirect route to '/d'
      browserHistory.push('/d')
      dispatch(fetchLibraries())
      console.log(response.data);
    })
    .catch(function(err) {
      // If request is bad
      // Show an error to the user
      console.log('ERROR 2', err)
      dispatch(authError('Bad login info'))
    });
  }

}

//
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

//
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: DEAUTH_USER }
}

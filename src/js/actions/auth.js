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


/**
 * signinUser - Sign's in the user by taking an object
 * with their email & password. Then makes a POST request
 * to the DB. If successful, we set the localStorage token
 * so that the user has access to all features and endpoints
 *
 * @param  {object} {email, password} - email and password values
 */
export function signinUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${API_URL}/login`, { email, password })
    .then(response => {
      // update state to indicate user is auth'd
      dispatch({ type: AUTH_USER });
      // save jwt token & redirect route to '/dashboard'
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/d')
    })
    .catch(function(err) {
      // If bad request, show error
      dispatch(authError('Bad login info'))
    });
  }
}

/**
 * signUpUser - Sign's up the user by taking an object
 * with their email & password. Then makes a POST request
 * to the DB. If successful, we set the localStorage token
 * so that the user has access to all features and endpoints
 *
 * @param  {object} {email, password} - email and password values
 */

export function signUpUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${API_URL}/signup`, { email, password })
    .then(response => {
      // update state to indicate user is auth'd
      dispatch({ type: AUTH_USER });
      // save the jwt token & redirect route
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/d')
      // // console.log(response.data);
    })
    .catch(function(err) {
      // If bad request, show error
      // // console.log('ERROR 2', err)
      dispatch(authError('Bad login info'))
    });
  }

}


/**
 * authError - Dispatch an action that will set
 * the state's authError property to the passed error
 *
 * @param  {string} error - description of error
 */
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}


/**
 * signoutUser - Sign's out the user by removing their token
 * from localStorage and firing the DEAUTH_USER action
 */
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: DEAUTH_USER }
}

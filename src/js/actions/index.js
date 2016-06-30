import { CHANGE_AUTH, FETCH_USERS } from './types';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';
const API_URL = 'http://localhost:8080';
import axios from 'axios';

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

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

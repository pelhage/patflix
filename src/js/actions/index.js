import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  FETCH_LIBS,
  ADD_LIB,
  UPDATE_CATS,
  CURR_VID,
  LIB_NAME
} from './types';

import { browserHistory } from 'react-router';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

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
      // If bad request, show error
      console.log('ERROR 2', err)
      dispatch(authError('Bad login info'))
    });
  }
}

export function signUpUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${API_URL}/signup`, { email, password })
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

export function createLibrary(library) {
  return function(dispatch) {
    axios.post(`${API_URL}/library`, library, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log(response.data);
      dispatch({
        type: ADD_LIB,
        payload: response.data
      })
    })
  }
}

export function updateCurrentLib(library) {
  if (library['allCategories'] && library['allCategories'].length) {
    // Update Category Tags... NOT EFFICIENT...
    library['allCategories'] = library.videos.reduce((allCategories, currentVideo) => {
      if (currentVideo.categories &&
        allCategories.indexOf(currentVideo.categories) === -1) {
        let arrOfCats = currentVideo.categories.split(",").map(item => item.trim());
        return allCategories.concat(arrOfCats)
      }

      return allCategories

    }, [])
  }

  if (library['allCategories'] && library['allCategories'].length) {
    library['featuredCategories'] = library.featuredCategories.filter((category) => {
      return library['allCategories'].indexOf(category) !== -1
    })
  }

  return {
    type: ADD_LIB,
    payload: library
  }
}
export function updateLibraryName(libraryName) {
  return {
    type: LIB_NAME,
    payload: libraryName
  }
}
export function updateCurrentVideo(video) {
  return {
    type: CURR_VID,
    payload: video
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}


export function fetchLibraries() {
  return function(dispatch) {
    axios.get(`${API_URL}/libraries`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log('fetchlibraries: ', response);
      console.log('fetchlibraries dispatching: ', response.data.message);
      dispatch({
        type: FETCH_LIBS,
        payload: response.data
      })
    })
    .catch(function(err) {
      // If bad request show error
      console.log('fetchLibraries err: ', err)
    });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: DEAUTH_USER }
}

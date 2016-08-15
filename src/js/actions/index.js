import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  FETCH_LIBS,
  FETCH_LIB_BY_ID,
  ADD_LIB,
  ADD_CATEGORY,
  CURR_VID,
  LIB_NAME,
  ADD_VID,
  REPLACE_CURRENT_VIDEO,
  REPLACE_CURRENT_LIBRARY,
  REMOVE_VIDEO,
  REMOVE_LIB
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
    })
    .catch(function(err) {
      // If bad request, show error
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

export function createLibrary(library) {
  console.log('Calling createLibrary in action creator', library)
  return function(dispatch) {
    axios.post(`${API_URL}/library`, library, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log('response from creating library',response.data);
      dispatch({
        type: ADD_LIB,
        payload: response.data
      })
      dispatch(fetchLibraries())
    })
  }
}

// Update the currentLibrary
export function updateLibrary(libraryId, library) {
  console.log('updateLibrary with: ', library)
  return function(dispatch) {
    axios.put(`${API_URL}/library/${libraryId}`, library, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      browserHistory.push('/d')
    })
  }
}

export function updateCurrentLib(library) {
  if (library['allCategories'] && library['allCategories'].length) {
    // Update Category Tags... NOT EFFICIENT...
    library['allCategories'] = library.videos.reduce((allCategories, currentVideo) => {
      if (currentVideo.categories &&
        allCategories.indexOf(currentVideo.categories) === -1) {
        let arrOfCats = currentVideo.categories;
        return allCategories.concat(arrOfCats)
      }

      return allCategories

    }, [])
  }

  if (library['allCategories'] && library['allCategories'].length) {
    library['featuredCategories'] = library['allCategories']
    // library['featuredCategories'] = library.featuredCategories.filter((category) => {
    //   return library['allCategories'].indexOf(category) !== -1
    // })
  }

  return {
    type: ADD_LIB,
    payload: library
  }
}

export function replaceCurrentVideo(videoId) {
  return function(dispatch, getState) {
    let video = _.cloneDeep(getState().libraries.currentLib.videos[videoId])
    dispatch({
      type: REPLACE_CURRENT_VIDEO,
      payload: video
    })
  }
}

//
export function setCurrentLib(libId) {

  return function(dispatch, getState) {
    let allLibs = _.cloneDeep(getState().libraries.all)
    let newLib = allLibs[libId]
    dispatch({
      type: REPLACE_CURRENT_LIBRARY,
      payload: newLib
    })
  }
}

//
export function updateLibraryName(libraryName) {
  return {
    type: LIB_NAME,
    payload: libraryName
  }
}

//
export function addVideoToLibrary(video) {
  return {
    type: ADD_VID,
    payload: video
  }
}


export function removeVideoFromLibrary(videoId) {
  return function(dispatch, getState) {
    let currentLib = _.cloneDeep(getState().libraries.currentLib)
    let allCategories = currentLib.allCategories
    let featuredVideos = currentLib.featuredVideos
    let video = currentLib.videos[videoId]
    console.log('REMOVING VIDEO FROM LIB: ', currentLib)
    // Remove the video from the list of featured Videos
    if (video.isFeatured) {
      featuredVideos.splice(featuredVideos.indexOf(videoId), 1)
    }

    // Now remove the video from allCategories
    video.categories.forEach((category) => {
      var currCategory = allCategories[category]
      currCategory.splice(currCategory.indexOf(category), 1)
      // If there are no more videos for this category, delete it
      if (!currCategory.length) {
        delete allCategories[category]
      }
    })
    delete currentLib.videos[videoId]
    currentLib.size -= 1
    console.log('REMOVING VIDEO FROM LIB AFTER: ', currentLib)
    //
    dispatch({
      type: REMOVE_VIDEO,
      payload: currentLib
    })
  }
}

//
export function addCategoryToLibrary(categories) {
  return {
    type: ADD_CATEGORY,
    payload: categories
  }
}

//
export function updateCurrentVideo(video) {
  return {
    type: CURR_VID,
    payload: video
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
export function fetchLibraries() {
  console.log('Im trying to fetch libraries')
  return function(dispatch) {
    axios.get(`${API_URL}/libraries`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log('fetchlibraries response: ', response.data);
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

export function fetchLibById(libraryId) {
  return function(dispatch) {
    axios.get(`${API_URL}/library/${libraryId}`)
      .then(response => {
        dispatch({
          type: FETCH_LIB_BY_ID,
          payload: response.data
        })
      })
  }
}




// Remove the currentLibrary
export function removeLibrary(libraryId) {
  return function(dispatch) {
    axios.delete(`${API_URL}/library/${libraryId}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      browserHistory.push('/d')
      // dispatch({
      //   type: REMOVE_LIB,
      //   payload: response.data
      // })
    })
  }
}


export function signoutUser() {
  localStorage.removeItem('token');

  return { type: DEAUTH_USER }
}

import {
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

// Browser history for react
import { browserHistory } from 'react-router';
// Import dependency libraries
import * as _ from 'lodash'
// Hashids for ID Hashing
import Hashids from 'hashids'
const hashids = new Hashids()
// API helpers
import axios from 'axios';
import API_URL from './api'


/**
 * createLibrary - add a Library to user's libraries
 *
 * @param  {object} library - object representing the library to be saved
 */
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


/**
 * fetchLibById - GET user library via libraryId
 *
 * @param  {string} libraryId - the library's ID to fetch
 */
export function fetchLibById(libraryId) {
  console.log('fetchLibById invoked')
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


/**
 * updateLibrary - replaces the selected library with an updated library
 * object
 *
 * @param  {string} libraryId - the library's ID
 * @param  {type} library   - Object representing the modified library
 */
export function updateLibrary(libraryId, library) {
  console.log('updateLibrary invoked')
  return function(dispatch) {
    axios.put(`${API_URL}/library/${libraryId}`, library, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      browserHistory.push('/d')
    })
  }
}


/**
 * TODO: DECIDE WHETHER THIS FUNCTION WILL STAY
 * updateCurrentLib - description
 *
 * @param  {type} library description
 * @return {type}         description
 */
export function updateCurrentLib(library) {
  console.log('updateCurrentLib invoked')
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
  console.log('ok...')
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


/**
 * fetchLibraries - fetch the user's libraries from the DB.
 * Uses tokens for authorization and validation
 */
export function fetchLibraries() {
  console.log('fetchLibraries invoked')
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
      console.log('fetchLibraries err: ', err)
    });
  }
}


/**
 * removeLibrary - remove's the specified library from the user's
 * libraries
 *
 * @param  {string} libraryId - library's Id
 */
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


/**
 * setCurrentLib - set's the state's currentLib value
 * to another library via Library ID
 *
 * @param  {string} libId - the library's ID
 */
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


/**
 * updateLibraryName - Update the selected library's name
 *
 * @param  {String} libraryName - name of library
 */
export function updateLibraryName(libraryName) {
  return function(dispatch, getState) {
    let library = _.cloneDeep(getState().libraries.currentLib)
    library.libName = libraryName

    dispatch({
      type: LIB_NAME,
      payload: library
    })
  }
}


/**
 * addVideoToLibrary - add the selected video to the library
 *
 * @param  {Object} video - object representing a video
 */
export function addVideoToLibrary(video) {
  return function(dispatch, getState) {
    let library = _.cloneDeep(getState().libraries.currentLib)
    let hashId = ''

    // If there's no videoId, then its a new video.
    if (!video.videoId) {
       hashId = hashids.encode(library.vidsAdded)
       library.vidsAdded += 1
       library.size += 1
       video.videoId = hashId
    } else {
      hashId = video.videoId
    }

    library.videos[hashId] = {...video, videoId: hashId}
    // Now we have to reflect these changes in featured....
    // If the video is featured...
    if (video.isFeatured) {
      // If it doesn't exist in the featuredVideos array, add it
      if (library.featuredVideos.indexOf(video.videoId) === -1) {
        library.featuredVideos.push(video.videoId)
      }
    } else {
      // If it is in the featured videos array, then it should be removed
      let featuredIndex = library.featuredVideos.indexOf(video.videoId)
      if (featuredIndex > -1) {
        library.featuredVideos.splice(featuredIndex, 1)
      }
    }

    dispatch({
      type: ADD_VID,
      payload: library
    })

  }
}


/**
 * removeVideoFromLibrary - removes video from the current Library
 *
 * @param  {String} videoId the Id of the selectedVideo
 */
export function removeVideoFromLibrary(videoId) {
  console.log('removeVideoFromLibrary invoked')
  return function(dispatch, getState) {
    let currentLib = _.cloneDeep(getState().libraries.currentLib)
    let allCategories = currentLib.allCategories
    let featuredVideos = currentLib.featuredVideos
    let video = currentLib.videos[videoId]
    console.log('[Removing video [',videoId,'] from currentLib: ', currentLib.videos.videoId)
    // Remove the video from the list of featured Videos
    if (video.isFeatured) {
      featuredVideos.splice(featuredVideos.indexOf(videoId), 1)
    }

    // Now remove the video from allCategories
    video.categories.forEach((category) => {
      var currCategory = allCategories[category]
      console.log('currCategory[',category,'] before', currCategory)
      currCategory.splice(currCategory.indexOf(category), 1)
      console.log('currCategory after', currCategory)
      // If there are no more videos for this category, delete it
      if (!currCategory.length) {
        console.log('AHH, NO CATEGORY LENGTH LEFT!!')
        console.log('currentLib.allCategories before deleting:', currentLib.allCategories)
        console.log('allCategories before deleting:',allCategories)
        delete allCategories[category]
        console.log('allCategories after deleting:', currentLib.allCategories)
        console.log('allCategories after deleting:', allCategories)
      }
    })
    console.log('DELETING THE VIDEO...')
    delete currentLib.videos[videoId]
    currentLib.size -= 1
    console.log('REMOVING VIDEO FROM LIB AFTER: ', currentLib)

    dispatch({
      type: REMOVE_VIDEO,
      payload: currentLib
    })
  }
}


/**
 * addCategoryToLibrary - adds the categories
 * of currentVideo to currentLib.allCategories
 *
 * @param  {Array} categories categories of currentVideo
 */
export function addCategoryToLibrary(categories) {
  return function(dispatch, getState) {
    let currentLib = _.cloneDeep(getState().libraries.currentLib)
    let allCategories = currentLib.allCategories
    let currentVideo = _.cloneDeep(getState().libraries.currentVideo)
    let hashId = ''

    if (!currentVideo.videoId) {
       currentVideo.videoId = hashids.encode(currentLib.vidsAdded)
    }

    if (categories.length) {
      // If the video is currently uncategorized, remove it from uncategorized
      let uncategorizedIndex = allCategories['Uncategorized'].indexOf(currentVideo.videoId)
      if (uncategorizedIndex > -1) {
        allCategories['Uncategorized'].splice(uncategorizedIndex, 1)
      }
      // Iterate through each category to ensure it exists in allCategories
      categories.forEach((category) => {
        // console.log('Going through each category for this video: ', category, ' :', currentVideo);
        if (!allCategories[category] || !allCategories[category].length) {
          allCategories[category] = [currentVideo.videoId]
        } // Just double check to make sure that we don't duplicate..
        else if (allCategories[category] && allCategories[category].length) {
          if (allCategories[category].indexOf(currentVideo.videoId) === -1) {
            allCategories[category].push(currentVideo.videoId)
          }
        }
      })
    }
    // Now check to make sure that the categories don't exist somewhere they're not supposed to
    for (var category in allCategories) {
      if (allCategories[category].indexOf(currentVideo.videoId) > -1 &&
          categories.indexOf(category) === -1) {
        let categoryIndex = allCategories[category].indexOf(currentVideo.videoId)
        allCategories[category].splice(categoryIndex, 1)
      }
    }
    if (!categories.length) {
      allCategories['Uncategorized'].push(currentVideo.videoId)
    }

    dispatch({
      type: ADD_CATEGORY,
      payload: { currentLib, currentVideo }
    })
  }
}

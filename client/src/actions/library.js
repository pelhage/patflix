// Browser history for react
// Import dependency libraries
import * as _ from 'lodash'
// Hashids for ID Hashing
import Hashids from 'hashids'
// API helpers
import axios from 'axios'
import history from '../routing/history'
import {
  FETCH_LIBS,
  FETCH_LIB_BY_ID,
  ADD_LIB,
  ADD_CATEGORY,
  LIB_NAME,
  ADD_VID,
  REPLACE_CURRENT_LIBRARY,
  REMOVE_VIDEO,
  REMOVE_LIB,
} from './types'
import API_URL from './api'

const hashids = new Hashids()

/*

createLibrary(library)
fetchLibById(libraryId)
updateLibrary(libraryId, library)
updateCurrentLib(library)
fetchLibraries()
removeLibrary(libraryId)
resetState()
setCurrentLib(libId)
updateLibraryName(libraryName)
addVideoToLibrary(video)
removeVideoFromLibrary(videoId)
addCategoryToLibrary(categories)
removeCategoryFromLibrary(categories)
 *
 */

/**
 * createLibrary - add a Library to user's libraries
 *
 * @param  {object} library - object representing the library to be saved
 */
export function createLibrary(library) {
  return function (dispatch) {
    axios
      .post(`${API_URL}/library`, library, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        dispatch({
          type: ADD_LIB,
          payload: response.data,
        })
        // dispatch(fetchLibraries())
        history.push('/d')
      })
  }
}

/**
 * fetchLibById - GET user library via libraryId
 *
 * @param  {string} libraryId - the library's ID to fetch
 */
export function fetchLibById(libraryId) {
  return function (dispatch) {
    axios.get(`${API_URL}/library/${libraryId}`).then((response) => {
      dispatch({
        type: FETCH_LIB_BY_ID,
        payload: response.data,
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
  return () => {
    axios
      .put(`${API_URL}/library/${libraryId}`, library, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        history.push('/d')
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
  if (library.allCategories && library.allCategories.length) {
    // Update Category Tags... NOT EFFICIENT...
    library.allCategories = library.videos.reduce(
      (allCategories, currentVideo) => {
        if (
          currentVideo.categories &&
          allCategories.indexOf(currentVideo.categories) === -1
        ) {
          const arrOfCats = currentVideo.categories
          return allCategories.concat(arrOfCats)
        }
        return allCategories
      },
      []
    )
  }
  if (library.allCategories && library.allCategories.length) {
    library.featuredCategories = library.allCategories
    // library['featuredCategories'] = library.featuredCategories.filter((category) => {
    //   return library['allCategories'].indexOf(category) !== -1
    // })
  }

  return {
    type: ADD_LIB,
    payload: library,
  }
}

/**
 * fetchLibraries - fetch the user's libraries from the DB.
 * Uses tokens for authorization and validation
 */
export function fetchLibraries() {
  return (dispatch) => {
    axios
      .get(`${API_URL}/libraries`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        dispatch({
          type: FETCH_LIBS,
          payload: response.data,
        })
      })
      .catch(() => {})
  }
}

/**
 * removeLibrary - remove's the specified library from the user's
 * libraries
 *
 * @param  {string} libraryId - library's Id
 */
export function removeLibrary(libraryId) {
  return function (dispatch) {
    axios
      .delete(`${API_URL}/library/${libraryId}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        history.push('/d')
        dispatch({
          type: REMOVE_LIB,
          payload: response.data,
        })
      })
  }
}

export function resetState() {
  return {
    type: REMOVE_LIB,
  }
}

/**
 * setCurrentLib - set's the state's currentLib value
 * to another library via Library ID
 *
 * @param  {string} libId - the library's ID
 */
export function setCurrentLib(libId) {
  return function (dispatch, getState) {
    const allLibs = _.cloneDeep(getState().libraries.all)
    const newLib = allLibs[libId]

    dispatch({
      type: REPLACE_CURRENT_LIBRARY,
      payload: newLib,
    })
  }
}

/**
 * updateLibraryName - Update the selected library's name
 *
 * @param  {String} libraryName - name of library
 */
export function updateLibraryName(libraryName) {
  return function (dispatch, getState) {
    const library = _.cloneDeep(getState().libraries.currentLib)
    library.libName = libraryName

    dispatch({
      type: LIB_NAME,
      payload: library,
    })
  }
}

/**
 * addVideoToLibrary - add the selected video to the library
 *
 * @param  {Object} video - object representing a video
 */
export function addVideoToLibrary(video) {
  return function (dispatch, getState) {
    const library = _.cloneDeep(getState().libraries.currentLib)
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

    library.videos[hashId] = {
      ...video,
      videoId: hashId,
    }
    // Now we have to reflect these changes in featured....
    // If the video is featured...
    if (video.isFeatured) {
      // If it doesn't exist in the featuredVideos array, add it
      if (library.featuredVideos.indexOf(video.videoId) === -1) {
        library.featuredVideos.push(video.videoId)
      }
    } else {
      // If it is in the featured videos array, then it should be removed
      const featuredIndex = library.featuredVideos.indexOf(video.videoId)
      if (featuredIndex > -1) {
        library.featuredVideos.splice(featuredIndex, 1)
      }
    }

    dispatch({
      type: ADD_VID,
      payload: library,
    })
  }
}

/**
 * removeVideoFromLibrary - removes video from the current Library
 *
 * @param  {String} videoId the Id of the selectedVideo
 */
export function removeVideoFromLibrary(videoId) {
  return function (dispatch, getState) {
    const currentLib = _.cloneDeep(getState().libraries.currentLib)
    const { allCategories } = currentLib
    const { featuredVideos } = currentLib
    const video = currentLib.videos[videoId]
    // If video is featured, remove it from currentLib.featuredVideos
    if (video.isFeatured && featuredVideos.indexOf(videoId) > -1) {
      featuredVideos.splice(featuredVideos.indexOf(videoId), 1)
    }
    // If the video has categories, then remove them from currentLib.allCategories
    // We also check to ensure it is in 'Uncategorized'
    if (!video.categories.length) {
      const indexOfVideo = allCategories.Uncategorized.indexOf(videoId)
      if (indexOfVideo > -1) {
        allCategories.Uncategorized.splice(indexOfVideo, 1)
      }
    } else if (video.categories.length) {
      video.categories.forEach((category) => {
        const currCategory = allCategories[category]
        currCategory.splice(currCategory.indexOf(videoId), 1)
        // If there are no more videos for this category, delete it
        // TODO: use more pure functions. This is a side effect
        if (!currCategory.length) {
          delete allCategories[category]
        }
      })
    }

    // Delete the video from the library
    delete currentLib.videos[videoId]
    currentLib.size -= 1
    dispatch({
      type: REMOVE_VIDEO,
      payload: currentLib,
    })
  }
}

/**
 * addCategoryToLibrary - adds the categories
 * of currentVideo to currentLib.allCategories
 *
 * TODO: Remove logic related to assigning videoId
 * @param  {Array} categories categories of currentVideo
 */
export function addCategoryToLibrary(categories) {
  return function (dispatch, getState) {
    const currentLib = _.cloneDeep(getState().libraries.currentLib)
    const { allCategories } = currentLib
    const currentVideo = _.cloneDeep(getState().libraries.currentVideo)

    if (!currentVideo.videoId) {
      currentVideo.videoId = hashids.encode(currentLib.vidsAdded)
    }

    if (categories.length) {
      // If the video is currently uncategorized, remove it from uncategorized
      const uncategorizedIndex = allCategories.Uncategorized.indexOf(
        currentVideo.videoId
      )
      if (uncategorizedIndex > -1) {
        allCategories.Uncategorized.splice(uncategorizedIndex, 1)
      }
      // Iterate through each category to ensure it exists in allCategories
      categories.forEach((category) => {
        if (!allCategories[category] || !allCategories[category].length) {
          allCategories[category] = [currentVideo.videoId]
        } // Just double check to make sure that we don't duplicate..
        else if (allCategories[category] && allCategories[category].length) {
          // If it's not in the category, then add it
          if (allCategories[category].indexOf(currentVideo.videoId) === -1) {
            allCategories[category].push(currentVideo.videoId)
          }
        }
      })
    }
    // Now check to make sure that the categories don't exist somewhere they're not supposed to
    for (const category in allCategories) {
      // If the video is in a category that it does not have listed,
      // then we need to remove it from allCategories
      if (
        allCategories[category].indexOf(currentVideo.videoId) > -1 &&
        categories.indexOf(category) === -1
      ) {
        const categoryIndex = allCategories[category].indexOf(
          currentVideo.videoId
        )
        allCategories[category].splice(categoryIndex, 1)
        // Now if that category is now empty, delete it!
        if (!allCategories[category].length && category !== 'Uncategorized') {
          delete allCategories[category]
        }
      }
    }
    if (!categories.length) {
      allCategories.Uncategorized.push(currentVideo.videoId)
    }

    dispatch({
      type: ADD_CATEGORY,
      payload: {
        currentLib,
        currentVideo,
      },
    })
  }
}

/**
 * addCategoryToLibrary - adds the categories
 * of currentVideo to currentLib.allCategories
 *
 * @param  {Array} categories categories of currentVideo
 */
export function removeCategoryFromLibrary(categories) {
  return function (dispatch, getState) {
    const currentLib = _.cloneDeep(getState().libraries.currentLib)
    const { allCategories } = currentLib
    const currentVideo = _.cloneDeep(getState().libraries.currentVideo)

    if (!currentVideo.videoId) {
      currentVideo.videoId = hashids.encode(currentLib.vidsAdded)
    }

    if (categories.length) {
      // If the video is currently uncategorized, remove it from uncategorized
      const uncategorizedIndex = allCategories.Uncategorized.indexOf(
        currentVideo.videoId
      )
      if (uncategorizedIndex > -1) {
        allCategories.Uncategorized.splice(uncategorizedIndex, 1)
      }
      // Iterate through each category to ensure it exists in allCategories
      categories.forEach((category) => {
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
    for (const category in allCategories) {
      if (
        allCategories[category].indexOf(currentVideo.videoId) > -1 &&
        categories.indexOf(category) === -1
      ) {
        const categoryIndex = allCategories[category].indexOf(
          currentVideo.videoId
        )
        allCategories[category].splice(categoryIndex, 1)
      }
    }
    if (!categories.length) {
      allCategories.Uncategorized.push(currentVideo.videoId)
    }

    dispatch({
      type: ADD_CATEGORY,
      payload: {
        currentLib,
        currentVideo,
      },
    })
  }
}

import {
  FETCH_LIBS,
  ADD_LIB,
  CURR_VID,
  LIB_NAME,
  FETCH_LIB_BY_ID,
  ADD_VID,
  ADD_CATEGORY,
  REPLACE_CURRENT_VIDEO,
  REPLACE_CURRENT_LIBRARY,
  REMOVE_VIDEO,
  REMOVE_LIB
} from '../actions/types'

import * as _ from 'lodash'
// For ID Hashing
import Hashids from 'hashids'
const hashids = new Hashids()

const initialState = {
  currentLib: {
    libraryId: null,
    size: 0,
    vidsAdded: 0,
    libName: '',
    videos: {},
    allCategories: {
      Uncategorized: []
    },
    featuredVideos: []
  },
  currentVideo: {
    videoId: '',
    youtubeId: '',
    url: '',
    isValidVideo: false,
    isFeatured: false,
    description: '',
    categories: []
  }
}

// If current url is valid, set id, if not set id to null
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIBS:
      return { ...state, all: action.payload }
    case FETCH_LIB_BY_ID:
      return { ...state, currentLib: action.payload }
    case ADD_LIB:
      return { ...state, currentLib: action.payload }
    case CURR_VID:
      return { ...state, currentVideo: action.payload }
    case LIB_NAME:
      return { ...state, currentLib: action.payload }
    case ADD_VID:
      return { ...state, currentVideo: initialState.currentVideo, currentLib: action.payload }
    case ADD_CATEGORY: {
      let library = _.cloneDeep(state.currentLib)
      let allCategories = library.allCategories
      let currentVideo = _.cloneDeep(state.currentVideo)
      let hashId = ''

      let categories = action.payload

      if (!currentVideo.videoId) {
         currentVideo.videoId = hashids.encode(library.vidsAdded)
      }

      if (categories.length) {
        // If the video is currently uncategorized, remove it from uncategorized
        let uncategorizedIndex = allCategories['Uncategorized'].indexOf(currentVideo.videoId)
        if (uncategorizedIndex > -1) {
          allCategories['Uncategorized'].splice(uncategorizedIndex, 1)
        }
        //
        categories.forEach((category) => {
          // console.log('Going through each category for this video: ', category, ' :', currentVideo);
          if (!allCategories[category] || !allCategories[category].length) {
            // console.log('NO CATEGORY FOUND');
            allCategories[category] = [currentVideo.videoId]
          }
          // Just double check to make sure that we don't duplicate..
          else if (allCategories[category] && allCategories[category].length) {
            // console.log('CATEGORY FOUND');
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

      return { ...state, currentLib: library, currentVideo }
    }
    case REPLACE_CURRENT_VIDEO: {
      return {...state, currentVideo: action.payload }
    }
    case REPLACE_CURRENT_LIBRARY: {
      return {...state, currentLib: action.payload }
    }
    case REMOVE_VIDEO: {
      return {...state, currentLib: action.payload, currentVideo: initialState.currentVideo}
    }
    case REMOVE_LIB: {
      return {...state, all: action.payload}
    }
  }

  return state;
}

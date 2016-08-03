import {
  FETCH_LIBS,
  ADD_LIB,
  CURR_VID,
  LIB_NAME,
  FETCH_LIB_BY_ID,
  ADD_VID,
  ADD_CATEGORY,
  REPLACE_CURRENT_VIDEO,
  REPLACE_CURRENT_LIBRARY
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
    allCategories: [],
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
    case FETCH_LIBS: {
      return { ...state, all: action.payload }
    }
    case FETCH_LIB_BY_ID: {
      return { ...state, currentLib: action.payload }
    }
    case ADD_LIB:
      return { ...state, currentLib: action.payload }
    case CURR_VID:
      return { ...state, currentVideo: action.payload }
    case LIB_NAME: {
      let library = _.cloneDeep(state.currentLib)
      library.libName = action.payload
      return { ...state, currentLib: library }
    }
    case ADD_VID: {
      let library = _.cloneDeep(state.currentLib)
      let hashId = ''
      console.log('action.payload.videoId: ', action.payload.videoId)
      if (!action.payload.videoId) {
         hashId = hashids.encode(state.currentLib.vidsAdded)
      } else {
        hashId = action.payload.videoId
      }
      library.videos[hashId] = {...action.payload, videoId: hashId}
      library.vidsAdded += 1
      library.size += 1

      return { ...state, currentVideo: initialState.currentVideo, currentLib: library }
    }
    case ADD_CATEGORY: {
      let library = _.cloneDeep(state.currentLib)
      library.allCategories = [...library.allCategories, ...action.payload]
      return { ...state, currentLib: library }
    }
    case REPLACE_CURRENT_VIDEO: {
      let video = _.cloneDeep(state.currentLib.videos[action.payload])
      return {...state, currentVideo: video }
    }
    case REPLACE_CURRENT_LIBRARY: {
      console.log('Invoking REPLACE_CURRENT_LIBRARY reducer with: ', action.payload)
      let allLibs = _.cloneDeep(state.all)
      console.log('REPLACE_CURRENT_LIBRARY allLibs: ', allLibs)
      return {...state, currentLib: allLibs[action.payload]}
    }
  }

  return state;
}

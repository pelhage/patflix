import {
  FETCH_LIBS,
  ADD_LIB,
  CURR_VID,
  LIB_NAME,
  ADD_VID,
  ADD_CATEGORY,
  REPLACE_CURRENT_VIDEO
} from '../actions/types'

import * as _ from 'lodash'
// For ID Hashing
import Hashids from 'hashids'
const hashids = new Hashids()

const initialState = {
  currentLib: {
    size: 0,
    vidsAdded: 0,
    name: '',
    videos: {},
    allCategories: [],
    featuredVideos: []
  },
  currentVideo: {
    id: '',
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
    case ADD_LIB:
      return { ...state, currentLib: action.payload }
    case CURR_VID:
      return { ...state, currentVideo: action.payload }
    case LIB_NAME: {
      const newLib = { ...state.currentLib, name: action.payload }
      return { ...state, currentLib: newLib }
    }
    case ADD_VID: {
      let hashId = hashids.encode(state.currentLib.vidsAdded)
      let library = _.cloneDeep(state.currentLib)
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
  }

  return state;
}

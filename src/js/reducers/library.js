import {
  FETCH_LIBS,
  ADD_LIB,
  CURR_VID,
  LIB_NAME,
  ADD_VID
} from '../actions/types'

// For ID Hashing
import Hashids from 'hashids'
const hashids = new Hashids('Patflix Is The Best!')


const initialState = {
  currentLib: {
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
      let hashId = hashids.encode(state.vidsAdded)
      const updatedLib = { ...state.currentLib, hashId: action.payload }
      console.log(updatedLib)
      return { ...state, currentLib: updatedLib }
    }
  }

  return state;
}

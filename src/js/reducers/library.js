import {
  FETCH_LIBS,
  ADD_LIB,
  CURR_VID,
  LIB_NAME
} from '../actions/types';


export default function(state = {
  currentLib: {
    name: '',
    videos: [],
    allCategories: [],
    featuredVideos: []
  },
  currentVideo: {
    id: '',
    url: '',
    isValidVideo: '',
    isFeatured: false,
    description: '',
    categories: ''
  }
}, action) {
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
  }

  return state;
}

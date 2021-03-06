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
  REMOVE_LIB,
} from '../actions/types'

const initialState = {
  currentLib: {
    libraryId: null,
    size: 0,
    vidsAdded: 0,
    libName: '',
    videos: {},
    allCategories: {
      Uncategorized: [],
    },
    featuredVideos: [],
  },
  currentVideo: {
    videoId: '',
    youtubeId: '',
    url: '',
    isValidVideo: false,
    isFeatured: false,
    description: '',
    categories: [],
  },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LIBS:
      return {
        ...state,
        all: action.payload,
      }
    case FETCH_LIB_BY_ID:
      return {
        ...state,
        currentLib: action.payload,
      }
    case ADD_LIB:
      return {
        ...state,
        currentLib: action.payload,
      }
    case CURR_VID:
      return {
        ...state,
        currentVideo: action.payload,
      }
    case LIB_NAME:
      return {
        ...state,
        currentLib: action.payload,
      }
    case ADD_VID:
      return {
        ...state,
        currentVideo: initialState.currentVideo,
        currentLib: action.payload,
      }
    case ADD_CATEGORY:
      return {
        ...state,
        ...action.payload,
      }
    case REPLACE_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: action.payload,
      }
    case REPLACE_CURRENT_LIBRARY:
      return {
        ...state,
        currentLib: action.payload,
      }
    case REMOVE_VIDEO:
      return {
        ...state,
        currentLib: action.payload,
        currentVideo: initialState.currentVideo,
      }
    case REMOVE_LIB:
      return {
        ...state,
        currentLib: initialState.currentLib,
        currentVideo: initialState.currentVideo,
      }
    default:
      return state
  }
}

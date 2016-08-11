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
    case LIB_NAME: {
      let library = _.cloneDeep(state.currentLib)
      library.libName = action.payload
      return { ...state, currentLib: library }
    }
    case ADD_VID: {
      let library = _.cloneDeep(state.currentLib)
      let hashId = ''
      let video = action.payload
      // If there's no videoId, then its a new video.
      if (!video.videoId) {
         hashId = hashids.encode(library.vidsAdded)
         library.vidsAdded += 1
         library.size += 1
         video.videoId = hashId
      } else {
        hashId = video.videoId
      }
      library.videos[hashId] = {...action.payload, videoId: hashId}

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

      return { ...state, currentVideo: initialState.currentVideo, currentLib: library }
    }
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
          console.log('Going through each category for this video: ', category, ' :', currentVideo);
          if (!allCategories[category] || !allCategories[category].length) {
            console.log('NO CATEGORY FOUND');
            allCategories[category] = [currentVideo.videoId]
          }
          // Just double check to make sure that we don't duplicate..
          else if (allCategories[category] && allCategories[category].length) {
            console.log('CATEGORY FOUND');
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
      let video = _.cloneDeep(state.currentLib.videos[action.payload])
      return {...state, currentVideo: video }
    }
    case REPLACE_CURRENT_LIBRARY: {
      console.log('Invoking REPLACE_CURRENT_LIBRARY reducer with: ', action.payload)
      let allLibs = _.cloneDeep(state.all)
      console.log('REPLACE_CURRENT_LIBRARY allLibs: ', allLibs)
      return {...state, currentLib: allLibs[action.payload]}
    }

    case REMOVE_VIDEO: {
      let currentLib = _.cloneDeep(state.currentLib)
      let allCategories = currentLib.allCategories
      let featuredVideos = currentLib.featuredVideos
      let video = currentLib.videos[action.payload]

      // Remove the video from the list of featured Videos
      if (video.isFeatured) {
        featuredVideos.splice(featuredVideos.indexOf(action.payload), 1)
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
      delete currentLib.videos[action.payload]
      currentLib.size -= 1
      let currentVideo = initialState.currentVideo
      return {...state, currentLib, currentVideo }
    }

    case REMOVE_LIB: {
      return {...state, all: action.payload}
    }
  }

  return state;
}

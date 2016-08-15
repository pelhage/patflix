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

    library.videos[hashId] = {...action.payload, videoId: hashId}

    dispatch({
      type: ADD_VID,
      payload: video
    })

  }
}


case ADD_VID: {
  // If there's no videoId, then its a new video.
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

import {
  CURR_VID,
  REPLACE_CURRENT_VIDEO
} from './types';

import * as _ from 'lodash'

//
export function updateCurrentVideo(video) {
  return {
    type: CURR_VID,
    payload: video
  }
}

//
export function replaceCurrentVideo(videoId) {
  return function(dispatch, getState) {
    let video = _.cloneDeep(getState().libraries.currentLib.videos[videoId])
    dispatch({
      type: REPLACE_CURRENT_VIDEO,
      payload: video
    })
  }
}

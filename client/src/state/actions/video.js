import * as _ from 'lodash'
import { CURR_VID, REPLACE_CURRENT_VIDEO } from './types'

/**
 * updateCurrentVideo - update's the currentVideo object
 * this is usually done when a property has been changed
 * (the whole video object will be replaced with an
 *  updated video obj)
 *
 * @param  {object} video - updated video object
 * @return {object}       - return's action
 */
export function updateCurrentVideo(video) {
  return {
    type: CURR_VID,
    payload: video,
  }
}

/**
 * replaceCurrentVideo - replace the state's currentVideo
 *
 * @param  {string} videoId - id of video to add to currentVideo
 */
export function replaceCurrentVideo(videoId) {
  return function (dispatch, getState) {
    const video = _.cloneDeep(getState().libraries.currentLib.videos[videoId])
    dispatch({
      type: REPLACE_CURRENT_VIDEO,
      payload: video,
    })
  }
}

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './auth_reducer'
import libraryReducer from './library'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  libraries: libraryReducer,
})

export default rootReducer
// TODO: consider breaking out video reducers into own currentVideo prop

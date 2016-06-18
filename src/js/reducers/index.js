import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import usersReducer from './users';

const rootReducer = combineReducers({
  authenticated: authenticationReducer,
  users: usersReducer
});

export default rootReducer;

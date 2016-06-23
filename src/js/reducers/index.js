import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import usersReducer from './users';
import { reducer as form} from 'redux-form';


const rootReducer = combineReducers({
  authenticated: authenticationReducer,
  users: usersReducer,
  form: form
});

export default rootReducer;

import { CHANGE_AUTH, FETCH_USERS } from './types';

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export function fetchUsers() {
  // fetch data here:
  const data = fetch('http://localhost:8080/dummyData');

  return {
    type: FETCH_USERS,
    payload: data
  }
}

export function signinUser( {email, password}) {
  return function(dispatch) {
    // Submit email/password to server
    // If request is good
    // - update state to indicate user is auth'd
    // - save the jwt token
    // - redirect route to '/feature'

    // If request is bad
    // - Show an error to the user
    // dispatch({ })
  }

}

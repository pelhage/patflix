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

import {
  FETCH_LIBS,
  ADD_LIB
} from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_LIBS:
      return { ...state, all: action.payload }
    case ADD_LIB:
      return { ...state, currentLib: action.payload }
  }

  return state;
}

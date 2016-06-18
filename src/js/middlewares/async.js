export default function({ dispatch }) {
  return next => action => {
    // If action does not have payload or does
    // not have a .then property, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure action promise resolves
    console.log('We have a promis: ', action);
    action.payload
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        // Create new action with the old type,
        // but replace the promise with response data
        const newAction = { ...action, payload: data };
        console.log('New action to be passed: ', newAction);
        dispatch(newAction);
      });
  };
}

/*
return function(next) {
  return function(action) {
    console.log(action);

    next(action);
  }
}
*/

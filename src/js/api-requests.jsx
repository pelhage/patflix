module.exports.createLibrary = function(videoLibrary) {
  var library = videoLibrary;
  // Options for API Call
  var options = {
    method: 'post',
    headers: new Headers({
      "Content-Type": "application/json",
      "userId": window.App._id
    }),
    body: JSON.stringify(library)
  };
  // Make API Call to Save Library
  fetch('/l', options).then(function(response) {
    response.text().then(function(text) {
      console.log('response text: ', text);
    });
  }).catch(function(err) {
    console.log(err);
  });

}
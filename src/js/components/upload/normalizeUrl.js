const normalizeUrl = (value, previousValue) => {
  if (!value) {
    return value
  }
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    this.setState({id: match[2]});
    return match[2];
  } else {
    return false;
  }
}

export default normalizeUrl

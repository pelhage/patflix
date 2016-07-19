import React, { Component, PropTypes } from 'react'

class Thumbnail extends Component {

  validateYoutubeId(url) {
    if (!url) { return undefined }
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    }
  }

  render() {
    const { url } = this.props;

    return (<img className="tile__img" src={"http://img.youtube.com/vi/"+this.validateYoutubeId(url)+"/0.jpg"} />)
  }
}


export default Thumbnail

Thumbnail.propTypes = {
  url: PropTypes.string.isRequired,
}

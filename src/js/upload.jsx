var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      id: '',
      description: '',
      videos: [],
      valid: false,
      isSaved: false,
    };
  },

  handleSubmit: function() {
    var library = this.state.videos;
    // Options for API Call
    var options = {
      method: 'post',
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({
        library: library,
        password: "Nerd"
      })
    };
    // Make API Call to Save Library
    fetch('/l', options).then(function(response) {
      response.text().then(function(text) {
        console.log(text);
      });
    }).catch(function(err) {
      console.log(err);
    });
  },

  handleIdChange: function(e) {
    this.setState({valid: this.validateYoutubeID(e.target.value)});
    this.setState({id: e.target.value});
  },

  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },

  addVideoToLib: function() {
    // Copy state & push to library's array
    var videosArr = this.state.videos.slice();
    videosArr.push({
      id: this.state.id,
      description: this.state.description
    });
    // Update state with new library, & reset forms
    this.setState({videos: videosArr});
    this.state.id = '';
    this.state.description = '';
  },

  validateYoutubeID: function(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return false;
    }
  },

  render: function() {
    var isValid;
    if (this.state.valid) {
      isValid = <span className="video-is-valid">&#x2714;</span>;
    } else if (this.state.id.length < 1) {
      isValid = '';
    } else {
      isValid = <span className="video-is-not-valid">&#10008;</span>;
    }
    return <div className="upload-container">
      <h2>Add Videos to Your Library</h2>
      <form className="upload-video">
        <div className="upload-video__input-container">
          <label className="upload-video__label" htmlFor="ytURL">YouTube URL
            {isValid}
          </label>
          <input 
            id="ytURL"
            className="upload-video__input"
            type="text"
            value={this.state.id} 
            onChange={this.handleIdChange} />
        </div>

        <div className="upload-video__input-container">
          <input className="upload-video__checkbox" id="isFeatured" type="checkbox" />
          <label htmlFor="isFeatured">Feature this video in your library</label>
        </div>

        <div className="upload-video__input-container">
          <label className="upload-video__label" htmlFor="description">Description</label>
          <p>Write a short summary of what this video is about.</p>
          <textarea 
            className="upload-video_textarea"
            id="description"
            value={this.state.description} 
            onChange={this.handleDescriptionChange}>
          </textarea>
        </div>

        <div className="upload-video__input-container">
          <label className="upload-video__label" htmlFor="categories">Categories</label>
          <textarea 
            className="upload-video_textarea"
            value={this.state.categories} 
            id="categories" 
            onChange={this.handleDescriptionChange}
            className="upload-video__input">
          </textarea>
        </div>

        <div className="upload-video__input-container">
          <input
            className="upload-video__button margin-right" 
            type="button" 
            onClick={this.addVideoToLib} 
            value="Add to Library" />
          <input
            className="upload-video__button upload-video__button--primary"
            onClick={this.handleSubmit} 
            type="button" 
            value="Save Library" />
        </div>
      </form>
    </div>
  }
});


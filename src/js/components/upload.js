import React from 'react';
import VideoData from '../library-data.js';

module.exports = React.createClass({

  getInitialState: function() {
    return {
      id: '',
      enteredUrl: '',
      description: '',
      videos: [],
      isValidId: false,
      isFeatured: false
    };
  },

  handleSubmit: function() {
    Requests.createLibrary(this.state.videos);
  },

  handleIdChange: function(e) {
    this.setState({
      enteredUrl: e.target.value,
      isValidId: this.validateYoutubeId(e.target.value)
    });
  },

  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },

  handleCategoriesChange: function(e) {
    this.setState({categories: e.target.value});
  },

  handleFeatureChange: function(e) {
    this.setState({ featured: e.target.checked });
  },

  addVideoToLib: function() {
    if (this.state.isValidId) {
      // Copy state & push to library's array
      var videosArr = this.state.videos.slice();
      videosArr.push({
        id: this.state.id,
        description: this.state.description
      });
      // Update state with new library, & reset forms
      this.setState({
        videos: videosArr,
        id: '',
        enteredUrl: '',
        description: '',
        isFeatured: false
      });
    }
  },

  validateYoutubeId: function(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      this.setState({id: match[2]});
      return match[2];
    } else {
      return false;
    }
  },

  render: function() {
    var isValid;
    if (this.state.isValidId) {
      isValid = <span className="video-is-valid">&#x2714;</span>;
    } else if (this.state.id.length < 1) {
      isValid = '';
    } else {
      isValid = <span className="video-is-not-valid">&#10008;</span>;
    }
    var currentLib = this.state.videos.map(function(video) {
      return (<div>
          <h2>{video.title}</h2>
          <div><img src={"http://img.youtube.com/vi/"+ video.id + "/0.jpg"} /></div>
          <p>{video.description}</p>
        </div>
      );
    });
    return (<div>
      <div className="form-container">
      <h2>Add Videos to Your Library</h2>
      <form className="form">
        <div className="form__input-container">
          <label className="form__label" htmlFor="ytURL">YouTube URL
            {isValid}
          </label>
          <input
            id="ytURL"
            className="form__input"
            type="text"
            value={this.state.enteredUrl}
            onChange={this.handleIdChange} />
        </div>

        <div className="form__input-container">
          <input
            className="form__checkbox"
            id="isFeatured"
            type="checkbox"
            value={this.state.isFeatured}
            onChange={this.handleFeatureChange}
            />
          <label htmlFor="isFeatured">Feature this video in your library</label>
        </div>

        <div className="form__input-container">
          <label className="form__label" htmlFor="description">Description</label>
          <p>Write a short summary of what this video is about.</p>
          <textarea
            className="form_textarea"
            id="description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}>
          </textarea>
        </div>

        <div className="form__input-container">
          <label className="form__label" htmlFor="categories">Categories</label>
          <textarea
            className="form_textarea"
            id="categories"
            value={this.state.categories}
            onChange={this.handleCategoriesChange}
            className="form__input">
          </textarea>
        </div>

        <div className="form__input-container">
          <input
            className="form__button margin-right"
            type="button"
            onClick={this.addVideoToLib}
            value="Add to Library" />
          <input
            className="form__button form__button--primary"
            onClick={this.handleSubmit}
            type="button"
            value="Save Library" />
        </div>
      </form>
    </div>
    <div className="upload-container">
      <div>{currentLib}</div>
    </div>
    </div>
    );
  }
});

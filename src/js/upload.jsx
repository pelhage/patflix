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
    return <div className="upload-container">
      <form className="upload-video">
        <div>
          <div>
            <label htmlFor="ytkey">Youtube Key:</label>
          </div>
          <input type="text" placeholder="Youtube ID" value={this.state.id} onChange={this.handleIdChange} />
          {this.state.valid && <span>VALID</span>}
        </div>
        <div>
          <div><label htmlFor="description">Description:</label></div>
          <textarea value={this.state.description} id="description" onChange={this.handleDescriptionChange}></textarea>
        </div>
        <div>
          <div><label htmlFor="categories">Categories:</label></div>
          <textarea value={this.state.categories} id="categories" onChange={this.handleDescriptionChange}></textarea>
        </div>
        <input type="button" onClick={this.addVideoToLib} value="Add Vid to Lib" />
        <input onClick={this.handleSubmit} type="button" value="Save Lib" />
      </form>
    </div>
  }
});


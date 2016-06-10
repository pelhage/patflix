var React = require('react');

var Hero = require('./hero.jsx');
var VideoRow = require('./video-row.jsx');

module.exports = React.createClass({

  render: function() {
    // Go through each category
    var allVideos = this.props.videos;
    console.log('videos: ', allVideos);
    var categories = this.props.categories;
    console.log('categories: ', this.props.categories);
    console.log('typeof categories: ', typeof this.props.categories);
    var VideoRows = categories.map(function(category) {
      // Grab videos that contain that category's tag
      var videos = allVideos.filter(function(video) {
        return video.categories.indexOf(category) > -1
      });
      // Return a Video Row component for this specific category
      return (<VideoRow videos={videos} category={category} />);
    });
    
    return (
      <div className="contain" >
        <Hero featured={this.props.featured} />
        {VideoRows}
      </div>
    );
  }
});
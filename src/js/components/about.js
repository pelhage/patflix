import React, { Component } from 'react';

export default class About extends Component {

  render() {
    return (<div className="container container--medium">
      <h1>Upload Your Own Netflix-Like Video Library</h1>
      <p>I created Patflix as a way to share my selection of Youtube videos with the world.</p>
      <p>All content is pulled in dynamically by category and by youtube ID, and then presented in Netflix-like fashion.</p>
      <p>The next iteration of Patflix already in progress will have an interface allowing for other people to upload \
      Youtube links and then share their library via a URL.</p>
    </div>);
  }
}

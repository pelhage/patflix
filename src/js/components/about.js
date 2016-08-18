import React, { Component } from 'react';

export default class About extends Component {

  render() {
    return (<div>
      <h1>Upload Your Own Netflix-Like Video Library</h1>
      <p>I created Patflix as a way to share my favorite Youtube videos with friends.</p>
      <h2>Tech Stack</h2>
      <h2>Front End</h2>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>React Router</li>
        <li>Sass</li>
      </ul>
      <h2>Back End</h2>
      <ul>
        <li>Node.js</li>
        <li>MongoDB</li>
        <li>Express & Pug</li>
        <li>PassportJS, JWT, & BCrypt</li>
      </ul>
      <p>All content is pulled in dynamically by category and by youtube ID, and then presented in Netflix-like fashion.</p>
    </div>
    );
  }
}

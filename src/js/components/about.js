import React, { Component } from 'react'
import { Link } from 'react-router'


export default class About extends Component {

  render() {
    return (<div className="flex justify-center">
      <div className="flex--lg flex-col">
        <h1 className="text-center">Tech Used</h1>
        <div className="bg--light padding--med margin-btm--med">
          <h3>Front End</h3>
          <ul>
            <li>JavaScript (ES6)</li>
            <li>React + Redux + React Router</li>
            <li>HTML (JSX)</li>
            <li>CSS (Sass + Flex Box)</li>
          </ul>
          <h3>Back End</h3>
          <ul>
            <li>Node.js</li>
            <li>Express (Web Framework)</li>
            <li>MongoDB (DB)</li>
            <li>Mongoose (ODM)</li>
            <li>Nginx (Reverse Proxy)</li>
            <li>Pug (Templating Engine)</li>
            <li>Authentication
              <ul>
                <li>JSON Web Tokens (JWT)</li>
                <li>PassportJS</li>
                <li>BCrypt</li>
              </ul>
            </li>
          </ul>
          <h3>Build Tools & Environment</h3>
          <ul>
            <li>Ubuntu 14.04 Production Server</li>
            <li>SSH</li>
            <li>Webpack</li>
            <li>Babel</li>
            <li>Git</li>
          </ul>
          <Link className="btn btn-primary full-width" to={"/dashboard"}>Create A Library</Link>
        </div>
      </div>
    </div>
    );
  }
}

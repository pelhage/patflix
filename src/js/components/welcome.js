import React, { Component } from 'react'
import About from './about'
import { Link } from 'react-router'

class Welcome extends Component {

  render() {
    return (<div className="container container--medium">
        <About />
        <Link to="/dashboard" className="btn btn-primary">Button</Link>
      </div>
    )
  }
}

export default Welcome

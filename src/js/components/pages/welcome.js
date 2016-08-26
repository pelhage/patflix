import React, { Component } from 'react'
import { Link } from 'react-router'

import About from './About'

class Welcome extends Component {

  render() {
    return (
      <div className="container container--medium">
        <About />
      </div>
    )
  }
}

export default Welcome

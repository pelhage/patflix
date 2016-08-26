import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container--sidebar">
          <VideoAdd />
          <VideoRemove />
        </div>
        <div className="container--main">
          <LibrarySave />
          <LibraryName />
        </div>
      </footer>
    )
  }
}

export default connect(null, actions)(Footer)

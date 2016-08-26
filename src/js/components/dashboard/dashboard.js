import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import VideoUpload from '../VideoUploader/VideoUpload'
import VideoAdd from '../VideoUploader/VideoAdd'
import VideoRemove from '../VideoUploader/VideoRemove'

import LibraryName from '../Library/LibraryName'
import LibrarySave from '../Library/LibrarySave'
import Preview from '../Library/Preview'

class Dashboard extends Component {

  // Initialize data if we don't already have any
  componentWillMount() {
    this.props.resetState()
    if (this.props.params.libId) {
      this.props.fetchLibById(this.props.params.libId)
    }
  }

  render() {
    return (
      <div className="contain">
        <div className="main-content">
          <div className="container--sidebar">
            <VideoUpload />
          </div>
          <div className="container--main">
            <Preview />
          </div>
        </div>
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
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);

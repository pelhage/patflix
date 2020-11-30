import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/actions'

import VideoUpload from '../components/VideoUploader/VideoUpload'
import VideoAdd from '../components/VideoUploader/VideoAdd'
import VideoRemove from '../components/VideoUploader/VideoRemove'

import LibraryName from '../components/Library/LibraryName'
import LibrarySave from '../components/Library/LibrarySave'
import Preview from '../components/Library/Preview'

class Dashboard extends React.Component {
  // Initialize data if we don't already have any
  componentWillMount() {
    this.props.resetState()
    if (this.props.match.params.libId) {
      this.props.fetchLibById(this.props.match.params.libId)
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
    )
  }
}

export default connect(null, actions)(Dashboard)

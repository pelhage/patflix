import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Preview from './upload/Preview';
import UploadForm from './upload-form/UploadForm';
import { Input, FormButton } from './form'
import LibraryName from './upload-form/LibraryName'
import LibrarySave from './upload-form/LibrarySave'
import VideoAdd from './upload-form/VideoAdd'
import VideoRemove from './upload-form/VideoRemove'
// Button Icons
import removeIcon from './remove.svg'

class Dashboard extends Component {

  // Initialize data if we don't already have any
  componentWillMount() {
    if (this.props.params.libId) {
      this.props.fetchLibById(this.props.params.libId)
    }
    else {
      this.props.resetState()
    }
  }

  render() {
    return (
      <div className="contain">
        <div className="main-content">
          <div className="container--sidebar">
            <UploadForm />
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

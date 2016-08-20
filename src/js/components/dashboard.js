import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Preview from './upload/Preview';
import UploadForm from './upload-form/UploadForm';
import { FormButton } from './form'

class Dashboard extends Component {
  // Initialize data if we don't already have any
  componentWillMount() {
    if (this.props.params.libId) {
      this.props.fetchLibById(this.props.params.libId)
    }
  }
  render() {
    const { currentLib } = this.props
    console.log('DASHBOARD currentLib: ', currentLib)
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
              <FormButton className="btn btn-secondary btn-main" onClick={() => {
                let { currentVideo } = this.props
                console.log('the currentVideo to be passed to addVideoToLibrary', currentVideo)
                this.props.addCategoryToLibrary(currentVideo.categories)
                this.props.addVideoToLibrary(currentVideo)
              }}>Save Video</FormButton>
            <FormButton className="btn btn-tertiary"onClick={() => {
                  this.props.removeVideoFromLibrary(this.props.currentVideo.videoId)
                }}>Remove Video</FormButton>
          </div>

          <div className="container--main">
              <FormButton className="btn btn-primary" onClick={() => {
                  console.log('Trying to submit library', this.props.currentLib)
                  if (this.props.currentLib.libraryId) {
                    console.log('This lib has a libraryId already. So I will update it.')
                    this.props.updateLibrary(this.props.currentLib.libraryId, this.props.currentLib)
                  } else {
                  console.log('This lib does not have a libraryId already. So I will create it.')
                  this.props.createLibrary(this.props.currentLib)
                  }
                }}>Save Library</FormButton>
          </div>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLib: state.libraries.currentLib,
    currentVideo: state.libraries.currentVideo
  }
}
export default connect(mapStateToProps, actions)(Dashboard);

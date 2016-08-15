import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Preview from './upload/Preview';
import UploadForm from './upload-form/UploadForm';

class Dashboard extends Component {
  // Initialize data if we don't already have any
  componentWillMount() {
    if (this.props.params.libId) {
      this.props.fetchLibById(this.props.params.libId)
    }
  }
  render() {
    const { currentLib, all } = this.props
    console.log('DASHBOARD currentLib: ', currentLib)
    return (
      <div className="contain">
        <div className="container--sidebar">
          <UploadForm />
        </div>
        <div className="container--main">
          <Preview />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    libraries: state.libraries.all,
    currentLib: state.libraries.currentLib,
    currentVideo: state.libraries.currentVideo
  }
}
export default connect(mapStateToProps, actions)(Dashboard);

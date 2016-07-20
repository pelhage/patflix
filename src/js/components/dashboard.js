import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Preview from './upload/Preview';
import DeepForm from './upload/DeepForm';
import UploadForm from './newupload/UploadForm';

class Dashboard extends Component {

  render() {
    const { currentLib } = this.props
    const divStyle = {
      height: window.innerHeight
    }

    return (
      <div className="contain" style={divStyle}>
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
    library: state.libraries.all,
    currentLib: state.libraries.currentLib,
    currentVideo: state.libraries.currentVideo
  }
}
export default connect(mapStateToProps, actions)(Dashboard);

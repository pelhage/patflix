import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Preview from './upload/Preview';
import DeepForm from './upload/DeepForm';
import Upload from './upload';

class Dashboard extends Component {

  componentWillMount() {
    // this.props.fetchLibraries()
  }

  render() {
    // Go through each category
    console.log(this.props);
    const { currentLib } = this.props
    console.log('dashboard, currentLib = ', currentLib);
    return (
      <div className="contain" >
        <div className="container--medium">
          <DeepForm />
        </div>
        <div className="contain">
          <div className="row">
            <Preview />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    library: state.libraries.all,
    currentLib: state.libraries.currentLib
  }
}
export default connect(mapStateToProps, actions)(Dashboard);

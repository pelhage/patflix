import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Upload from './upload';

class Dashboard extends Component {

  componentWillMount() {
    this.props.fetchLibraries()
  }

  render() {
    // Go through each category
    return (
      <div className="contain" >
        <h1>Hello, this is the dashboard</h1>
        <div>
          <Upload />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);

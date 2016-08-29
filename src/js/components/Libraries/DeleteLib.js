import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class DeleteLib extends Component {
  componentWillMount() {
    this.props.removeLibrary(this.props.params.libId)
  }

  render() {
    return null
  }
}

export default connect(null, actions)(DeleteLib);

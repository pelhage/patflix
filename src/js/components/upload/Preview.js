import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Library from '../library';

class Preview extends Component {
  render() {
    if (!this.props.currentLib) {
      return <div>Preview of Your Library!</div>
    }
    const { name, videos, allCategories } = this.props.currentLib
    console.log('Preview Component render. this.props.currentLib:', this.props.currentLib)
    return (<div>
      <h1>{name}</h1>
      <Library videos={videos} categories={allCategories} />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default connect(mapStateToProps, actions)(Preview);

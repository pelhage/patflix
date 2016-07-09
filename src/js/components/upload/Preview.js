import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Library from '../library';

class Preview extends Component {
  render() {
    if (!this.props.currentLib) {
      return <div>Preview of Your Library!</div>
    }
    const { name, videos, allCategories } = this.props.currentLib
    return (<div>
      <h1>{name}</h1>
      <div>
        {/* {allCategories.map((category, index) => {
          return <div key={index}>{category}</div>
        })} */}
      </div>
      <div>
        <Library videos={videos} categories={allCategories} />
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default connect(mapStateToProps, actions)(Preview);

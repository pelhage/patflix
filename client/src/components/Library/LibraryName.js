import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Input } from '../Form'

class LibraryName extends React.Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(e) {
    this.props.updateLibraryName(e.target.value)
  }

  render() {
    const { libName } = this.props.currentLib
    return (
      <span className="btn btn-tertiary">
        <Input
          value={libName}
          placeholder="Name Your Library"
          onChange={this.handleNameChange}
        />
      </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentLib: state.libraries.currentLib,
  }
}

export default connect(mapStateToProps, actions)(LibraryName)

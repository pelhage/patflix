import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../state/actions'

class LibrarySave extends React.Component {
  constructor(props) {
    super(props)
    this.saveLibrary = this.saveLibrary.bind(this)
  }

  saveLibrary() {
    const { currentLib } = this.props
    if (currentLib.libraryId) {
      this.props.updateLibrary(currentLib.libraryId, currentLib)
    } else {
      this.props.createLibrary(currentLib)
    }
  }

  render() {
    return (
      <button className="btn btn-primary btn-main" onClick={this.saveLibrary}>
        Save Library
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentLib: state.libraries.currentLib,
  }
}

export default connect(mapStateToProps, actions)(LibrarySave)

import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../state/actions'

const LibrarySave = ({ currentLib, updateLibrary, createLibrary }) => {
  const saveLibrary = () => {
    if (currentLib.libraryId) {
      updateLibrary(currentLib.libraryId, currentLib)
    } else {
      createLibrary(currentLib)
    }
  }

  return (
    <button className="btn btn-primary btn-main" onClick={saveLibrary}>
      Save Library
    </button>
  )
}

const mapStateToProps = (state) => ({
  currentLib: state.libraries.currentLib,
})

export default connect(mapStateToProps, actions)(LibrarySave)

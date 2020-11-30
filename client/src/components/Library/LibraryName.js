import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../state/actions'
import { Input } from '../Form'

const LibraryName = ({ updateLibraryName, currentLib: { libName } }) => (
  <span className="btn btn-tertiary">
    <Input
      value={libName}
      placeholder="Name Your Library"
      onChange={(e) => updateLibraryName(e.target.value)}
    />
  </span>
)

const mapStateToProps = (state) => ({ currentLib: state.libraries.currentLib })

export default connect(mapStateToProps, actions)(LibraryName)

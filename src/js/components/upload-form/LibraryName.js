import React, { Component, PropTypes } from 'react'
import { Input } from '../form'

class LibraryName extends Component {

  render() {
    const { onUserInput, value } = this.props
    return (<Input
      value={value}
      placeholder="Name Your Library"
      onChange={onUserInput}/>)
  }
}

LibraryName.propTypes = {
  onUserInput: PropTypes.func.isRequired
}

export default LibraryName

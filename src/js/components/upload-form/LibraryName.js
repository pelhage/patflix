import React, { Component, PropTypes } from 'react'
import { Input, FormFieldset, FormLabel } from '../form'

class LibraryName extends Component {

  render() {
    const { onUserInput } = this.props
    return (<FormFieldset>
      <FormLabel>Library Name</FormLabel>
      <Input placeholder="Name Your Library" onChange={onUserInput}/>
    </FormFieldset>)
  }
}

LibraryName.propTypes = {
  onUserInput: React.PropTypes.func.isRequired
}

export default LibraryName

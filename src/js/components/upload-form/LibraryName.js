import React, { Component, PropTypes } from 'react'
import { Input, FormFieldset, FormLabel } from '../form'

class LibraryName extends Component {

  render() {
    const { onUserInput, value } = this.props
    return (<FormFieldset>
      <FormLabel>Library Names</FormLabel>
      <Input
        value={value}
        placeholder="Name Your Library"
        onChange={onUserInput}/>
    </FormFieldset>)
  }
}

LibraryName.propTypes = {
  onUserInput: React.PropTypes.func.isRequired
}

export default LibraryName

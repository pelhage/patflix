import React, { Component, PropTypes } from 'react'
import { FormFieldset, FormLabel } from '../form'
import { CategoriedInput } from '../categoried_input'

class VideoCategories extends Component {

  render() {
    const { onUserInput } = this.props

    return (<FormFieldset>
      <FormLabel>Categories</FormLabel>
      <CategoriedInput
        onCategoryChange={this.onUserInput}
        placeholder="e.g. enter, categories, separated by, commas" />
    </FormFieldset>)
  }
}

VideoCategories.propTypes = {
  onUserInput: React.PropTypes.func.isRequired
}

export default VideoCategories

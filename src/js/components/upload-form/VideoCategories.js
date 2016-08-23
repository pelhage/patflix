import React, { Component, PropTypes } from 'react'
import { FormFieldset, FormLabel } from '../form'
import { CategoriedInput } from '../categoried_input'

class VideoCategories extends Component {

  render() {
    const { categories, onUserInput } = this.props

    return (<FormFieldset>
      <FormLabel>Categories</FormLabel>
      <CategoriedInput
        categories={categories}
        onCategoryChange={onUserInput}
        placeholder="enter categories, separated, by, commas" />
    </FormFieldset>)
  }
}

VideoCategories.propTypes = {
  onUserInput: PropTypes.func.isRequired
}

export default VideoCategories

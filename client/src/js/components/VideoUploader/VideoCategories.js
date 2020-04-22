import React from 'react'
import PropTypes from 'prop-types'
import { FormFieldset, FormLabel } from '../Form'
import { CategoriedInput } from '../CategoriedInput'

const VideoCategories = (props) => {

  const { categories, onUserInput } = props

  return (
    <FormFieldset>
      <FormLabel>Categories</FormLabel>
      <CategoriedInput
        categories={categories}
        onCategoryChange={onUserInput}
        placeholder="enter categories, separated, by, commas" />
    </FormFieldset>
  )
}

VideoCategories.propTypes = {
  categories: PropTypes.array,
  onUserInput: PropTypes.func.isRequired
}

export default VideoCategories

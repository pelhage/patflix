import React, { Component, PropTypes } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

/* Component Dependencies */
import Input from '../form/Input'
import FormFieldset from '../form/FormFieldset'
import FormLabel from '../form/FormLabel'
import FormButton from '../form/FormButton'
import VideoDetails from './VideoDetails'

class UploadForm extends Component {
  constructor(props) {
    super(props)
    // Bind member functions
    this.updateCurrentLib = this.updateCurrentLib.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleLibNameUpdate = this.handleLibNameUpdate.bind(this)
    // this.renderAllCategories = this.renderAllCategories.bind(this)
  }

  updateCurrentLib() {
    console.log(this.props.currentLib)
    this.props.updateCurrentLib(this.state.currentLib)
  }

  // if video is valid, then updateCurrentLib()
  // if library is valid, then saveCurrentLib()

  handleFormSubmit() {
    this.props.createLibrary(this.props.currentLib)
  }

  handleLibNameUpdate(e) {
    this.props.updateLibraryName(e.target.value)
  }

  render() {
    const { currentLib } = this.props

    return (<div className="form-container">

      <h2>Add Videos to Your Library</h2>
      <form className="form" onSubmit={this.handleFormSubmit}>

        <FormFieldset>
          <FormLabel>Library Name</FormLabel>
          <Input placeholder="Name" onChange={this.handleLibNameUpdate}/>
        </FormFieldset>

        <VideoDetails />

        <FormFieldset>
          <FormButton onClick={() => {
            // let { currentLib, currentVideo } = this.props
            let updatedVideos = [...this.props.currentLib.videos, this.props.currentVideo]
            let categories = this.props.currentVideo.categories.split(",")
            let newLib = {...this.props.currentLib, videos: updatedVideos, allCategories: categories }

            this.props.updateCurrentLib(newLib)
          }}>Add A Video</FormButton>
        </FormFieldset>

        <FormFieldset>
          <FormButton>Save Library</FormButton>
        </FormFieldset>
      </form>

    </div>)
  }
}

function mapStateToProps(state) {
  return {
    currentLib: state.libraries.currentLib
  }
}

export default connect(mapStateToProps, actions)(UploadForm)
/*
allCategories[],
featuredCategories[],
featuredVideos[],

allCategories = [
  {
    name: 'Category Name'
    count: 0
  },
  {

  },
]
[]

// addToCategories
  // Add to the individual video's categories
  // Check to see if it exists in allCategories.forEach((item, index) => {})
    // If it does, increment
    // If not, push to allCategories { name: category, count: 1 }

// removeFromCategories (press x next to span)
  // remove from individual video's categories
  // Before moving on, check to see if it exists elsewhere... (eventually a counter will be better Big O)
  // Check to see if it exists in allCategories
    // If it does, decrement
      // If count = 0, remove

// Use currentVideo's categories as what is being added and pushed
// Use currentLib's videos[].reduce().indexOf(category) || allCategories.forEach()

<CategoriedInput>
  // One Input Box (hit tab or ',' to add Input)
  <Input onTab/onChange/onKeyPress={addToCategories}>
  <RenderedCategories {...categories}>
    {categories.map((category) => {
      <span>{category}<span onClick={removeFromCategories}>X</span></span>
    })}
  </RenderedCategories>
</CategoriedInput>

// If count
*/
// Figure out best way to add and remove allCategories
// User clicks on video...
  // Video info populates form
    // Array of categories gets parsed down into string for editing...
    //

import React, { Component, PropTypes } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

/* Component Dependencies */
import Input from './Input'
import FormFieldset from './FormFieldset'
import FormLabel from './FormLabel'
import FormButton from './FormButton'
import VideoDetails from './VideoDetails'

class UploadForm extends Component {
  constructor(props) {
    super(props)
    // Bind member functions
    // this.updateCurrentLib = this.updateCurrentLib.bind(this)
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
    // this.renderAllCategories = this.renderAllCategories.bind(this)
  }

  // updateCurrentLib() {
  //
  // }

  handleFormSubmit() {
    this.props.createLibrary()
  }

  render() {
    return (<div className="form-container">

      <h2>Add Videos to Your Library</h2>
      <form className="form" onSubmit={this.handleFormSubmit}>

        <FormFieldset>
          <FormLabel>Library Name</FormLabel>
          <Input placeholder="Name" />
        </FormFieldset>

        <VideoDetails />

        <FormFieldset>
          <FormButton>Add A Video</FormButton>
        </FormFieldset>

        <FormFieldset>
          <FormButton>Save Library</FormButton>
        </FormFieldset>
      </form>

    </div>)
  }
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib }
}

export default connect(mapStateToProps, actions)(UploadForm)

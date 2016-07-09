import React, { Component, PropTypes } from 'react'
import { reduxForm, addArrayValue } from 'redux-form'
import Video from './Video'
import PureInput from './PureInput'
import validate from './validateDeepForm'
import * as actions from '../../actions';

export const fields = [
  'name',
  'videos[].url',
  'videos[].description',
  'videos[].title',
  'videos[].categories',
  'videos[].isFeatured'
]

class DeepForm extends Component {
  constructor(props) {
    super(props)
    // Bind member functions
    this.updateCurrentLib = this.updateCurrentLib.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formProps) {
    console.log(formProps);
    this.props.createLibrary(formProps);
  }

  updateCurrentLib(formProps) {
    console.log('update State, currentLib: ', formProps);
    this.props.updateCurrentLib(formProps);
  }

  render() {

    const {
      fields: { name, featuredCategories, allCategories, videos },
      handleSubmit,
      resetForm,
      invalid,
      submitting,
      currentLib
    } = this.props

    const formData = this.props.values;

    return (<div className="form-container container--medium">
      <form className="form" onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="form__input-container">
          <label className="form__label">Library Name</label>
          <div>
            <PureInput type="text" placeholder="Name" field={name} title={name.error}/>
          </div>
        </div>

        {/* Display Message If Lib is Empty */}
        {!videos.length && <div>Your Library is Empty.</div>}

        {/* Display all current videos to be saved */}
        {videos.map((video, index) => <div className="form-container bg--med" key={index}>
          <Video {...video} />
          <div className="form__input-container">
            <button className="form__button" type="button" onClick={() => {
              videos.removeField(index)
              this.updateCurrentLib(formData);
            }}><i/> Remove Video
            </button>
          </div>
        </div>
        )}

        {/* Add a Video to Form */}
        <div className="form__input-container">
          <button className="form__button" type="button" onClick={() => {
            this.updateCurrentLib(formData);
            videos.addField()   // pushes empty child field onto the end of the array
          }}><i/> Add a Video
          </button>
        </div>

        {/* Select Categories From Library */}

        {/* Submit Library */}
        <div className="form__input-container">
          <button className="form__button" type="submit" disabled={submitting || invalid}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
      </div>
    )
  }
}

DeepForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default reduxForm({
  form: 'deep',
  fields,
  validate
}, mapStateToProps, actions)(DeepForm)

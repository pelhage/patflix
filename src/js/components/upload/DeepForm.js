import React, { Component, PropTypes } from 'react'
import Video from './Video'
import PureInput from './PureInput'
import validate from './validateDeepForm'
import * as actions from '../../actions';
import { connect } from 'react-redux';

class DeepForm extends Component {
  constructor(props) {
    super(props)
    // Bind member functions
    this.updateCurrentLib = this.updateCurrentLib.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.renderAllCategories = this.renderAllCategories.bind(this)
  }

  // componentWillMount() {
  //   let { currentLib } = this.props
  //   // Ensures we don't lose form data when component Unmounts..
  //   if (currentLib) {
  //     name.value = currentLib.name;
  //     currentLib.videos.forEach((video) => {
  //     })
  //   }
  //   // this.props.updateCurrentLib(this.props.values);
  // }

  handleFormSubmit(formProps) {
    this.props.createLibrary(formProps);
  }

  updateCurrentLib(formProps) {
    console.log('this form will now be saved to state: ', formProps);
    this.props.updateCurrentLib(formProps);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate: ', this.props)
    // this.props.updateCurrentLib(this.props.values);
  }

  renderAllCategories() {
    if (this.props.currentLib) {
      let allCategories = this.props.currentLib.allCategories
      if (allCategories) {
        let all = allCategories.map((category, index) => {
          return <label key={index}><input type="checkbox" value={category} onClick={() => {
              // if (this.props.fields.featuredCategories.indexOf(category) === -1) {
              //   this.props.fields.featuredCategories.addField(category)
              // }
          }} />{category}</label>
        });
        return (<div><h1>Select Your Featured Categories</h1><div><p>The following are all the categories that you've used when adding videos. Select the ones that you would like to feature on your library's page.</p>{all}</div></div>)
      }
    }
  }
  render() {

    const { currentLib } = this.props

    return (<div className="form-container">
      <form className="form" onSubmit={this.handleFormSubmit}>
        <div className="form__input-container">
          <label className="form__label">Library Name</label>
          <div>
            <PureInput type="text" placeholder="Name" field={name} />
          </div>
        </div>

        {/* Display Message If Lib is Empty */}
        {/* !videos.length && <div>Your Library is Empty.</div> */}

        {/* Display all current videos to be saved */}
        {/*videos.map((video, index) => <div className="form-container bg--med" key={index}>
          <Video {...video} />
          <div className="form__input-container">
            <button className="form__button" type="button" onClick={() => {
            }}><i/> Remove Video
            </button>
          </div>
        </div>
        )*/}

        {/* Add a Video to Form */}
        <div className="form__input-container">
          <button className="form__button" type="button"><i/> Add a Video
          </button>
        </div>

        {/* Select Categories From Library */}
        {/* this.renderAllCategories() */}
        {/* Submit Library **/}
        <div className="form__input-container">
          <button className="form__button" type="submit">
            {/* submitting ? <i/> : <i/> */} Submit
          </button>
        </div>
      </form>
      </div>
    )
  }
}

// DeepForm.propTypes = {
//
// }

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default connect(mapStateToProps, actions)(DeepForm);

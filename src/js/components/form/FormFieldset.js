import React, { Component } from 'react'

class FormFieldset extends Component {
  render() {
    return (<fieldset className="form__input-container">{this.props.children}</fieldset>)
  }
}
export default FormFieldset

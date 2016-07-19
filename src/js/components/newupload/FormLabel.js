import React, { Component, PropTypes } from 'react'

class FormLabel extends Component {
  render() {
    return <label className="form__label">{this.props.children}</label>
  }
}

export default FormLabel

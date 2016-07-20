import React, { Component, PropTypes } from 'react'

class FormButton extends Component {
  render() {
    return (<button className="form__button" type="button" {...this.props}><i/> {this.props.children}</button>)
  }
}

export default FormButton

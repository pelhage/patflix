import React, { Component, PropTypes, defaultProps } from 'react'

class Input extends Component {

  render() {

      return <input className="form__input" {...this.props}/>
  }
}

Input.defaultProps = { type: "text" }

export default Input

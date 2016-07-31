import React, { Component, PropTypes } from 'react'

class TextArea extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }

  render() {
    return <textarea className="form_textarea" {...this.props}></textarea>
  }
}

export default TextArea

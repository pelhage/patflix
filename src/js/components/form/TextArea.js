import React, { Component, PropTypes } from 'react'

class TextArea extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }

  render() {
    console.log('this.props.value', this.props)
    return <textarea className="form_textarea" {...this.props}></textarea>
  }
}

export default TextArea

import React, { Component, PropTypes } from 'react'

class TextArea extends Component {

  render() {
    return <textarea className="form_textarea" {...this.props}/>
  }
}

export default TextArea

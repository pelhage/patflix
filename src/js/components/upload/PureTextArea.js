import React, { Component, PropTypes } from 'react'

class PureTextArea extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field
  }

  render() {
    const { field, ...rest } = this.props
    return <textarea className="form_textarea" {...field} {...rest}/>
  }
}

PureTextArea.propTypes = {
  field: PropTypes.object.isRequired
}

export default PureTextArea

import React, { Component, PropTypes } from 'react'

class Form extends Component {

  render() {
    const { onFormSubmit } = this.props

    return (<form className="form" onSubmit={onFormSubmit}>
      {this.props.children}
    </form>)
  }
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Form

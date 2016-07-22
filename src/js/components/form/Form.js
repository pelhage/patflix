import React, { Component, PropTypes } from 'react'

class Form extends Component {

  render() {
    const { onFormSubmit, children } = this.props

    return (<form className="form" onSubmit={onFormSubmit}>
      {this.props.children}
    </form>)
  }
}

Form.propTypes = {
  onFormSubmit: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired
}

export default Form

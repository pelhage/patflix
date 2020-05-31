import React from 'react'
import PropTypes from 'prop-types'

const Form = (props) => {
  return <form>{props.children}</form>
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Form

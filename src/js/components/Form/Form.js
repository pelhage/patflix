import React, { PropTypes } from 'react'

const Form = (props) => {

  const { onFormSubmit } = props

  return (
    <form className="form" onSubmit={onFormSubmit}>
      {props.children}
    </form>
  )
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Form

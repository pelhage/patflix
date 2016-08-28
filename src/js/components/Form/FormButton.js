import React from 'react'

const FormButton = (props) => {
  return (<button className="form__button" type="button" {...props}><i/> {props.children}</button>)
}

export default FormButton

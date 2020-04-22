import React from 'react'

class Input extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }

  render() {
    return <input className="form__input" {...this.props}/>
  }
}

Input.defaultProps = { type: "text" }

export default Input

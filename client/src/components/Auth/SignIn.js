import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import { Form, FormLabel, FormFieldset, Input } from '../Form'

function SignIn(props) {
  function handleFormSubmit({ email, password }) {
    props.signinUser({ email, password })
  }

  function renderAlert() {
    if (props.errorMessage) {
      return <div>Error:{props.errorMessage}</div>
    }
    return <div />
  }
  const [email, setEmail] = React.useState({
    value: '',
    touched: false,
    error: '',
  })
  const [password, setPassword] = React.useState({
    value: '',
    touched: false,
    error: '',
  })


    return (
      <div className="flex-center">
        <h2>Make Your Own Shareable Library</h2>

        <div className="container--small form-container bg--med">
          <h3>Sign Into Patflix</h3>
          
          <FormFieldset>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              value={email.value}
              onChange={(e) =>
                setEmail({
                  value: e.target.value,
                  touched: !!e.target.value.length,
                  error: email.error,
                })
              }
              id="email"
              type="email"
            />
            <div className="auth-error">
              {email.touched && email.error && <div>{email.error}</div>}
            </div>
          </FormFieldset>

            <FormFieldset>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              value={password.value}
              onChange={(e) => {
                setPassword({
                  value: e.target.value,
                  touched: !!e.target.value.length,
                  error: password.error,
                })
              }}
              id="password"
              type="password"
            />
            <div className="auth-error">
              {password.touched && password.error && (
                <div>{password.error}</div>
              )}
            </div>
          </FormFieldset>
            <div className="auth-error">{renderAlert()}</div>
            <button onClick={
              handleFormSubmit({
                email: email.value,
                password: password.value
              })
            } action="submit" className="btn btn-primary btn-full">
              Sign In
            </button>
        </div>
      </div>
    )
}

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default connect(
  mapStateToProps,
  actions
)(SignIn)

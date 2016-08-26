import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

import { Form, FormLabel, FormFieldset, Input } from '../Form'

class SignUp extends Component {
  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>Error {this.props.errorMessage}</div>
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <div className="flex-center">
        <h2>Make Your Own Shareable Library</h2>

        <div className="container--small form-container bg--med">
          <h3>Sign Up For Patflix</h3>
          <Form onFormSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <FormFieldset>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input {...email} id="email" type="email" />
              <div className="auth-error">{email.touched && email.error && <div>{email.error}</div>}</div>
            </FormFieldset>
            <FormFieldset>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input {...password} id="password" type="password" />
              <div className="auth-error">{password.touched && password.error && <div>{password.error}</div>}</div>
            </FormFieldset>
            <FormFieldset>
              <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
              <Input {...passwordConfirm} id="passwordConfirm" type="password" />
              <div className="auth-error">{passwordConfirm.dirty && passwordConfirm.error && <div>{passwordConfirm.error}</div>}</div>
            </FormFieldset>
            <div className="auth-error">{this.renderAlert()}</div>
            <button action="submit" className="btn btn-primary btn-full">Sign Up</button>
          </Form>
        </div>

      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password'
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(SignUp);

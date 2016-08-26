import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
  handleFormSubmit(formProps) {
    // console.log(email, password);
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
          <form className="form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="form__input-container no-margin">
              <label className="form__label" htmlFor="email">Email</label>
              <input {...email} id="email"
                className="form__input no-margin"
                type="email"/>
              <div className="auth-error">{email.touched && email.error && <div>{email.error}</div>}</div>
            </div>
            <div className="form__input-container no-margin">
              <label className="form__label" htmlFor="password">Password</label>
              <input {...password} id="password"
                className="form__input no-margin"
                type="password"
                />
              <div className="auth-error">{password.touched && password.error && <div>{password.error}</div>}</div>
            </div>
            <div className="form__input-container no-margin">
              <label className="form__label" htmlFor="passwordConfirm">Confirm Password</label>
              <input {...passwordConfirm} id="passwordConfirm"
                className="form__input no-margin"
                type="password"
                />
              <div className="auth-error">{passwordConfirm.dirty && passwordConfirm.error && <div>{passwordConfirm.error}</div>}</div>
            </div>
            <div className="auth-error">{this.renderAlert()}</div>
            <button action="submit" className="btn btn-primary btn-full">Sign Up</button>
          </form>
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
    // console.log('They dont match: ', formProps.password, ' vs ', formProps.passwordConfirm);
  }
  return errors;
}

function mapStateToProps(state) {
  // console.log('state', state);
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(SignUp);

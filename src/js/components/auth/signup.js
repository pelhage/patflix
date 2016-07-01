import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
  handleFormSubmit(formProps) {
    console.log(email, password);
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
        <h1>Sign Up to Upload Your Own Shareable Library</h1>

        <div className="container--small form-container bg--med">
          <h2>Sign Into Patflix</h2>
          <form className="form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="form__input-container">
              <label className="form__label" htmlFor="email">Email</label>
              {email.touched && email.error && <div>{email.error}</div>}
              <input {...email} id="email"
                className="form__input"
                type="email"/>
            </div>
            <div className="form__input-container">
              <label className="form__label" htmlFor="password">Password</label>
              {password.touched && password.error && <div>{password.error}</div>}

              <input {...password} id="password"
                className="form__input"
                type="password"
                />
            </div>
            <div className="form__input-container">
              <label className="form__label" htmlFor="passwordConfirm">Confirm Password</label>
              {passwordConfirm.dirty && passwordConfirm.error && <div>{passwordConfirm.error}</div>}
              <input {...passwordConfirm} id="passwordConfirm"
                className="form__input"
                type="passwordConfirm"
                />
            </div>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign In</button>
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
    console.log('They dont match: ', formProps.password, ' vs ', formProps.passwordConfirm);
  }
  return errors;
}

function mapStateToProps(state) {
  console.log('state', state);
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(SignUp);

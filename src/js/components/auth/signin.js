import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return <div>Error</div>
    } else {
      return <div></div>
    }
  }
  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <div className="flex-center">
        <h1>Log In to Upload Your Own Shareable Library</h1>

        <div className="container--small form-container bg--med">
          <h2>Sign Into Patflix</h2>
          <form className="form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="form__input-container">
              <label className="form__label" htmlFor="email">Email</label>
              <input {...email} id="email"
                className="form__input"
                type="email"/>
            </div>
            <div className="form__input-container">
              <label className="form__label" htmlFor="password">Password</label>
              <input {...password} id="password"
                className="form__input"
                type="password"
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

function mapStateToProps(state) {
  console.log('state', state);
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  authButton() {
    if (this.props.authenticated) {
      return <Link to="/signout" className="nav__item">Sign Out</Link>
    }
    return [
      <Link to="/about" className="nav__item">About Patflix</Link>,
      <Link to="/signin" className="nav__item">Sign In</Link>,
      <Link to="/signup" className="nav__item">Sign Up</Link>
    ];
  }
  render() {
    return (
      <nav className="nav">
        <Link to="/" className="nav__item nav__item--brand">PATFLIX</Link>
        <span className="nav__item--pull-right">
          <Link to="/dashboard" className="nav__item">Create Library</Link>
          { this.authButton() }
        </span>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(Header);

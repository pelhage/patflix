import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  authButton() {
    if (this.props.authenticated) {
      return <button onClick={() => this.props.authenticate(false)}>Sign Out</button>
    }
    return (
      <button onClick={() => this.props.authenticate(true)}>Sign In</button>
    );
  }
  render() {
    return (
      <nav className="nav">
        <Link className="nav__item nav__item--brand" to="/">PATFLIX</Link>
        <span className="nav__item--pull-right">
          <Link className="nav__item" to="/dashboard">Create Library</Link>
          <Link className="nav__item" to="/about">About Patflix</Link>
          { this.authButton() }
          <Link className="nav__item" to="/signin">Signin</Link>
          <Link className="nav__item" to="/upload">Upload</Link>
        </span>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.authenticated }
}

export default connect(mapStateToProps, actions)(Header);

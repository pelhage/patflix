import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'

import DropdownMenu from './dropdown'

import addIcon from './add.svg'
import librariesIcon from './collection2.svg'

let imgtyle = {
  width: '27px',
  marginBottom: '-5px'
};


class Header extends Component {
  authButton() {
    if (this.props.authenticated) {
      return (<span>
        <Link to="/d" activeClassName="nav__item--active" className="nav__item">
            <img style={imgtyle} src={librariesIcon} />  My Libraries</Link>
        <DropdownMenu />
      </span>
      )
    }
    return [
      <Link to="/about" className="nav__item" activeClassName="nav__item--active">About Patflix</Link>,
      <Link to="/signin" className="nav__item" activeClassName="nav__item--active">Sign In</Link>,
      <Link to="/signup" className="nav__item" activeClassName="nav__item--active">Sign Up</Link>
    ];
  }
  render() {
    return (
      <nav className="nav">
        <Link to="/" className="nav__item nav__item--brand">PATFLIX</Link>
        <span className="nav__item--pull-right">
          <Link to="/dashboard" activeClassName="nav__item--active" className="nav__item">
            <img style={imgtyle} src={addIcon} />  Add Library</Link>
          { this.authButton() }
        </span>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, actions, null, {
  pure: false
})(Header);

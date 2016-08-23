import React, { Component } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import { Link } from 'react-router'

import signOut from './signout.svg'

class DropdownMenu extends Component {
  render() {
    let imgtyle = {
      width: '27px',
      marginBottom: '-5px'
    };

    return (<Dropdown className="nav__item">
      <DropdownTrigger><img style={imgtyle} src={signOut} /> Profile</DropdownTrigger>
      <DropdownContent>
        <ul className="dropdown-menu">
          <li><Link to="/about">About Patflix</Link></li>
          <li><Link to="/signout">Sign Out</Link></li>
        </ul>
      </DropdownContent>
    </Dropdown>)
  }
}

export default DropdownMenu

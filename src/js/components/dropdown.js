import React, { Component } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'


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
          <li><a href="/about">FAQ</a></li>
          <li><a href="/favorites">Favorites</a></li>
          <li><a href="/signout">Sign Out</a></li>
        </ul>
      </DropdownContent>
    </Dropdown>)
  }
}

export default DropdownMenu

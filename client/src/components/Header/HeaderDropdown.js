import React from 'react'
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown'
import { Link } from 'react-router-dom'

import signOut from '../../images/signout.svg'

const HeaderDropdown = () => {
  const imgStyle = {
    width: '27px',
    marginBottom: '-5px',
  }
  return (
    <Dropdown className="nav__item">
      <DropdownTrigger>
        <img style={imgStyle} src={signOut} /> More
      </DropdownTrigger>
      <DropdownContent>
        <ul className="dropdown-menu">
          <li>
            <Link to="/about">About Patflix</Link>
          </li>
          <li>
            <Link to="/signout">Sign Out</Link>
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>
  )
}

export default HeaderDropdown

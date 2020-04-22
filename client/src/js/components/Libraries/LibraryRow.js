import React from 'react'
import { Link } from 'react-router-dom';

// import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import { FormButton } from '../Form'

// Icons
import removeIcon from '../../images/remove.svg'

const LibraryRow = (props) => {

  const { libName, libraryId, size } = props
  let libNameText = libName || 'Untitled'
  let videosText = (size === 1) ? 'video' : 'videos'

  return (
    <div className="flex flex-between bg--light padding--med margin-btm--med">
      <div>
        <h3>{libNameText}</h3>
        <h4><Link to={"/l/"+libraryId}>patflix.co/l/{libraryId}</Link></h4>
        <p><strong>{size}</strong> {videosText} in this library</p>
      </div>

      <div className="btn-group">
        <Link className="btn btn-secondary" to={"/d/"+libraryId}>Edit</Link>
        <Link className="btn btn-secondary" to={"/l/"+libraryId}>VIEW</Link>
        {/* <Dropdown className="nav__item">
          <DropdownTrigger>
            <FormButton className="btn btn-tertiary no-padding">
              <img style={{'width': '30px'}} src={removeIcon} />
            </FormButton>
          </DropdownTrigger>
          <DropdownContent>
            <ul className="dropdown-menu">
              <li><Link className="btn btn-secondary" to={"/r/"+libraryId}>Confirm Deletion</Link></li>
            </ul>
          </DropdownContent>
        </Dropdown> */}
      </div>
    </div>
  )
}

export default LibraryRow

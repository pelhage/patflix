import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router';
// Components
import { FormButton } from './form'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
// Icons
import removeIcon from './remove.svg'

class Libraries extends Component {
  constructor(props) {
    super(props)
    this.fetchLibraries = this.fetchLibraries.bind(this)
  }
  componentWillMount() {
    this.props.fetchLibraries()
  }
  fetchLibraries() {
    this.props.fetchLibraries()
  }
  // Render the libraries once they've been
  // dispatched -> down to props
  renderLibraries() {
    if (this.props.libraries) {
      let arrOfVids = []
      let libs = this.props.libraries
      for (var key in libs) {
        arrOfVids.push(libs[key])
      }
      return arrOfVids
    }
    return []
  }

  render() {
    const { libraries } = this.props
    if (!libraries) {
      return (<div className="flex justify-center">
        <div className="flex--lg flex-col">
          <h1 className="text-center">You Have No Libraries</h1>
          <div className="bg--light padding--med margin-btm--med text-center">
            <h3>Creating a library is simple!</h3>
            <div>
              <p>Paste YouTube video URLs, then tag them with categories.</p>
              <p>Patflix will generate the layout based on your tags, and create a shareable link.</p>
            </div>
            <Link className="btn btn-primary full-width" to={"/dashboard"}>Create A Library</Link>
          </div>
        </div>
      </div>
      );
    }
    let libs = this.renderLibraries().map((library, index) => {
      let libName = library.libName || 'Untitled'
      let videosText = 'videos'
      if (library.size === 1) {
        videosText = 'video'
      }

      return (<div className="flex flex-between bg--light padding--med margin-btm--med">
        <div>
          <h3>{libName}</h3>
          <h4>patflix.co/l/{library.libraryId}</h4>
          <p><strong>{library.size}</strong> {videosText} in this library</p>
        </div>

        <div className="btn-group">
          <Link className="btn btn-secondary" to={"/d/"+library.libraryId}>Edit</Link>
          <Link className="btn btn-secondary" to={"/l/"+library.libraryId}>VIEW</Link>
          <Dropdown className="nav__item">
            <DropdownTrigger><FormButton className="btn btn-tertiary no-padding"><img style={{'width': '30px'}} src={removeIcon}/></FormButton></DropdownTrigger>
            <DropdownContent>
              <ul className="dropdown-menu">
                <li><Link className="btn btn-secondary" to={"/r/"}>Confirm Deletion</Link></li>
              </ul>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>)
    })

    return (<div className="flex justify-center">
      <div className="flex--lg flex-col">
        <h1>My Libraries</h1>
        {libs}
      </div>
    </div>)
  }
}


function mapStateToProps(state) {
  return {
    libraries: state.libraries.all,
  }
}

export default connect(mapStateToProps, actions)(Libraries);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router';

import { FormButton } from './form'

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
//
  // H1
  // Div.flex-direction
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

          <div className="bg--light padding--med margin-btm--med">
            <p>Library Size: <strong>6</strong> videos</p>
            <p>Paste YouTube video URLs, add categories</p>
            <p>Library _id:    </p>
            <p>Library libraryId:    </p>
            <Link className="btn btn-secondary" to={"/d/"}>Edit Library</Link>
            <Link className="btn btn-secondary" to={"/r/"}>DELETE Library</Link>
            <Link className="btn btn-secondary" to={"/l/"}>VIEW Library</Link>
          </div>

        </div>
      </div>
      );
    }
    let libs = this.renderLibraries().map((library, index) => {
      return (<div key={index} className="bg--med">
        // <h2>{library.libName}</h2>
        <p>Library Size: <strong>{library.size}</strong> videos</p>
        <p>Library libraryId:    {library.libraryId}</p>
        <Link className="btn btn-secondary" to={"/d/"+library.libraryId}>Edit Library</Link>
        <Link className="btn btn-secondary" to={"/r/"+library.libraryId}>DELETE Library</Link>
        <Link className="btn btn-secondary" to={"/l/"+library.libraryId}>VIEW Library</Link>
      </div>)
    })

    return (<div>
      {libs}
    </div>)
  }
}


function mapStateToProps(state) {
  return {
    libraries: state.libraries.all,
  }
}

export default connect(mapStateToProps, actions)(Libraries);

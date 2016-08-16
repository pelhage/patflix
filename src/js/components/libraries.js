import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router';

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
    let libs = this.renderLibraries().map((library, index) => {
      return (<div key={index} className="bg--med">
        // <h2>{library.libName}</h2>
        <p>Library Size: <strong>{library.size}</strong> videos</p>
        <p>Library _id:    {library._id}</p>
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

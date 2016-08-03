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
    let libs = this.renderLibraries().map((library) => {
    {/*console.log('item', library) */}
      return (<div className="bg--med">
        <h2>{library.libName}</h2>
        <p>Num of videos: {library.size}</p>
        <p>Go to lib: /l/{library.libraryId}</p>
        <Link className="btn btn-secondary" to={"/d/"+library.libraryId}>Edit Library</Link>
        <Link className="btn btn-secondary" to={"/d/"+library.libraryId}>View Library</Link>
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

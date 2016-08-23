import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router';
// Components
import { FormButton } from './form'
import LibraryPlaceholder from './library-placeholder'
import LibraryRow from './library-row'


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
    console.log('Libraries when rendering', libraries)

    if (!libraries || !Object.keys(libraries).length) {
      return (<LibraryPlaceholder />);
    } else if (!libraries) {
      return <div></div>
    }

    let libs = this.renderLibraries().map((library, index) => {
      return (<LibraryRow
        libName={library.libName}
        libraryId={library.libraryId}
        size={library.size}
         />)
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

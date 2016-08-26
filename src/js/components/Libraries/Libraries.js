import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
// Components
import LibrariesPlaceholder from './LibrariesPlaceholder'
import LibraryRow from './LibraryRow'


class Libraries extends Component {
  constructor(props) {
    super(props)
    this.fetchLibraries = this.fetchLibraries.bind(this)
    this.renderLibraries = this.renderLibraries.bind(this)
  }

  componentWillMount() {
    this.fetchLibraries()
  }

  fetchLibraries() {
    this.props.fetchLibraries()
  }

  removeLibrary() {
    this.props.removeLibrary(this.props.params.libId)
  }
  // Render the libraries once they've been
  // dispatched -> down to props
  renderLibraries() {
    const { libraries } = this.props

    if (libraries === '') {
      return (<LibrariesPlaceholder />)
    } else if (!libraries) {
      return null
    } else if (libraries && !Object.keys(libraries).length) {
      return (<LibrariesPlaceholder />)
    }else if (libraries) {
      let arrOfVids = []
      let libs = this.props.libraries

      for (var key in libs) {
        arrOfVids.push(libs[key])
      }
      return (
        <div>
          <h1>My Libraries</h1>
          {arrOfVids.map((library, index) => {
            console.log(index);
            return (
              <LibraryRow
                libName={library.libName}
                libraryId={library.libraryId}
                size={library.size}
                key={index}
               />
            )
          })}
        </div>
      )
    }
    // Return Library Placeholder if there are no libraries
    return (<LibrariesPlaceholder />)
  }

  render() {
    return (
      <div className="flex justify-center">
        <div className="flex--lg flex-col">
          {this.renderLibraries()}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { libraries: state.libraries.all }
}

export default connect(mapStateToProps, actions)(Libraries);

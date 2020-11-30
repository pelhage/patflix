import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/actions'
// Components
import LibrariesPlaceholder from '../components/Libraries/LibrariesPlaceholder'
import LibraryRow from '../components/Libraries/LibraryRow'

class Libraries extends React.Component {
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
    this.props.removeLibrary(this.props.match.params.libId)
  }

  // Render the libraries once they've been
  // dispatched -> down to props
  renderLibraries() {
    const { libraries } = this.props

    if (libraries === '') {
      console.log('libraries === ""', libraries)
      return <LibrariesPlaceholder />
    }
    if (!libraries) {
      return null
    }
    if (libraries && !Object.keys(libraries).length) {
      return <LibrariesPlaceholder />
    }
    if (libraries) {
      const arrOfVids = []
      const libs = this.props.libraries

      for (const key in libs) {
        arrOfVids.push(libs[key])
      }
      return (
        <div>
          <h1>My Libraries</h1>
          {arrOfVids.map((library, index) => {
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
    return <LibrariesPlaceholder />
  }

  render() {
    return (
      <div className="flex justify-center">
        <div className="flex--lg flex-col">{this.renderLibraries()}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    libraries: state.libraries.all,
  }
}

export default connect(mapStateToProps, actions)(Libraries)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Link } from 'react-router';
// Components
import { FormButton } from '../form'
import LibraryPlaceholder from './library-placeholder'
import LibraryRow from './library-row'


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
  // Render the libraries once they've been
  // dispatched -> down to props
  renderLibraries() {
    const { libraries } = this.props

    if (!libraries || !Object.keys(libraries).length) {
      console.log('first if statement');
      return (<LibraryPlaceholder />);
    }
    else if (libraries) {
      let arrOfVids = []
      let libs = this.props.libraries

      for (var key in libs) {
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
               />
            )
          })}
        </div>
      )
    }
    // Return Library Placeholder if there are no libraries
    return (<LibraryPlaceholder />)
  }

  render() {
    const { libraries } = this.props

    return (<div className="flex justify-center">
      <div className="flex--lg flex-col">
        {this.renderLibraries()}
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

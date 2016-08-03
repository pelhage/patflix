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
  setCurrentLib(libId) {
    // click on one of these libs, who have id props passed to them on the button
      // this will set currentLib = this.props.all[libId]
    this.props.setCurrentLib(libId)
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
    console.log('Params', this.props.params)
    const { libraries } = this.props
    let libs = this.renderLibraries().map((library) => {
    {/*console.log('item', library) */}
      return (<div className="bg--med">
        <h2>{library.libName}</h2>
        <p>Num of videos: {library.size}</p>
        <p>Go to lib: /l/{library.libraryId}</p>
        <button className="form__button" onClick={() => this.setCurrentLib(library.libraryId)}></button>
        <Link to={"/d/"+library.libraryId}>Link to the lib!</Link>
      </div>)
    })

    return (<div>
      <div className="form__button" onClick={this.fetchLibraries.bind(this)}>Render</div>
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

import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class DeleteLib extends React.Component {
  componentWillMount() {
    this.props.removeLibrary(this.props.match.params.libId)
  }

  render() {
    return null
  }
}

export default connect(null, actions)(DeleteLib)

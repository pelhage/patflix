import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import history from '../../routing/history'

export default function (ComposedComponent) {
  class Authentication extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        history.push('/signin')
      }
    }

    componentWillUpdate() {
      if (!this.props.authenticated) {
        history.push('/signin')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  Authentication.contextTypes = {
    router: PropTypes.object,
  }
  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    }
  }

  return connect(mapStateToProps)(Authentication)
}

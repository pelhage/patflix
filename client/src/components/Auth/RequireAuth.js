import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  class Authentication extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/signin')
      }
    }

    componentWillUpdate() {
      if (!this.props.authenticated) {
        this.context.router.push('/signin')
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

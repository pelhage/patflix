import { connect } from 'react-redux';
import React from 'react'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  class Authentication extends React.Component {
    // static
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/signin')
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.props.authenticated) {
        this.context.router.push('/signin')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication);
}

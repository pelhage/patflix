import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class SignOut extends React.Component {
  componentWillMount() {
    this.props.signoutUser()
  }

  render() {
    return (
      <div className="flex justify-center">
        <div className="flex--lg flex-col">
          <h1 className="text-center">See you later.</h1>
          <div className="bg--light padding--med margin-btm--med text-center">
            <div>
              <h3>You&apos;ve been logged out of Patflix on this device.</h3>
              <p>
                If you have any feedback or requests, feel free to email me:
              </p>
              <p>
                <a href="mailto:patrick@patflix.co">patrick@patflix.co</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(SignOut)

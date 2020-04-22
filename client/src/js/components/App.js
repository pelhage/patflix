import React from 'react'
import Header from './Header/Header'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="main-view">
          {this.props.children}
        </div>
      </div>
    );
  }
}

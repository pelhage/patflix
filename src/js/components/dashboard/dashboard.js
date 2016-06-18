import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DashboardHeader from './dashboard-header';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <DashboardHeader />
        {this.props.children}
      </div>
    );
  }
}

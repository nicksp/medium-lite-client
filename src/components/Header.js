import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand">{this.props.appName.toLowerCase()}</a>
        </div>
      </nav>
    );
  }
}

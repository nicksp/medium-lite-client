import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './Header';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appName: state.appName
});

export default connect(mapStateToProps)(App);

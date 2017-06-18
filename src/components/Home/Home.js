import React, { Component } from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

import MainView from './MainView';
import Banner from './Banner';

class Home extends Component {
  constructor(props) {
    super(props);
    const tab = props.token ? 'feed' : 'all';
    const articlesPromise = props.token ? agent.Articles.feed() : agent.Articles.all();
    props.onLoad(tab, articlesPromise);
  }

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) => dispatch({
    type: 'HOME_PAGE_LOADED',
    tab,
    payload
  }),
  onUnload: () => dispatch({ type: 'HOME_PAGE_UNLOADED' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

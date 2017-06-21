import React, { Component } from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

import MainView from './MainView';
import Banner from './Banner';
import Tags from './Tags';

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

class Home extends Component {
  constructor(props) {
    super(props);

    const tab = props.token ? 'feed' : 'all';
    const articlesPromise = props.token ? agent.Articles.feed : agent.Articles.all;
    props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <Tags tags={this.props.tags} onTagSelect={this.props.onTagSelect} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTagSelect: (tag, pager, payload) => dispatch({
    type: APPLY_TAG_FILTER,
    tag,
    pager,
    payload
  }),
  onLoad: (tab, pager, payload) => dispatch({
    type: HOME_PAGE_LOADED,
    tab,
    pager,
    payload
  }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

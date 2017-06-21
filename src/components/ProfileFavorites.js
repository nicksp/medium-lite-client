import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import agent from '../agent';

import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';
import { Profile, mapStateToProps } from './Profile';

class ProfileFavorites extends Profile {
  constructor(props) {
    super(props);

    const { username } = props.params;

    props.onLoad(page => agent.Articles.favoritedBy(username, page), Promise.all([
      agent.Profile.get(username),
      agent.Articles.favoritedBy(username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    const { profile } = this.props;

    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link" to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" to={`/@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);

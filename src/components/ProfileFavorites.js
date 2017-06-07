import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import agent from '../agent';

import { Profile, mapStateToProps } from './Profile';

class ProfileFavorites extends Profile {
  constructor(props) {
    super(props);

    const { username } = props.params;

    props.onLoad(Promise.all([
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
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: agent.Profile.follow(username)
  }),
  onLoad: payload => dispatch({ type: 'PROFILE_FAVORITES_PAGE_LOADED', payload }),
  onUnfollow: username => dispatch({
    type: 'UNFOLLOW_USER',
    payload: agent.Profile.unfollow(username)
  }),
  onUnload: () => dispatch({ type: 'PROFILE_FAVORITES_PAGE_UNLOADED' })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);

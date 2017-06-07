import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import agent from '../agent';

import ArticleList from './ArticleList';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="settings"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}
    >
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

class Profile extends Component {
  constructor(props) {
    super(props);

    props.onLoad(Promise.all([
      agent.Profile.get(props.params.username),
      agent.Articles.byAuthor(props.params.username)
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
          <Link className="nav-link active" to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { articles, profile, currentUser, onFollow, onUnfollow } = this.props;

    if (!profile) {
      return null;
    }

    const isUser = currentUser && profile.username === currentUser.username;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={onFollow}
                  unfollow={onUnfollow}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList articles={articles} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: agent.Profile.follow(username)
  }),
  onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
  onUnfollow: username => dispatch({
    type: 'UNFOLLOW_USER',
    payload: agent.Profile.unfollow(username)
  }),
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' })
});

export { Profile as Profile, mapStateToProps as mapStateToProps };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

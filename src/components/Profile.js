import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import agent from '../agent';

import ArticleList from './ArticleList';

function EditProfileSettings({ isUser }) {
  if (isUser) {
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

function FollowUserButton({ isUser, user, unfollow, follow }) {
  if (isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';

  if (user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = event => {
    event.preventDefault();
    if (user.following) {
      unfollow(user.username)
    } else {
      follow(user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}
    >
      <i className="ion-plus-round" />
      &nbsp;
      {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  );
};

class Profile extends Component {
  constructor(props) {
    super(props);

    const { username } = props.params;

    props.onLoad(Promise.all([
      agent.Profile.get(username),
      agent.Articles.byAuthor(username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSetPage(page) {
    const promise = agent.articles.byAuthor(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
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
    const {
      articles,
      articlesCount,
      currentPage,
      profile,
      currentUser,
      onFollow,
      onUnfollow
    } = this.props;

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
                <img src={profile.image} alt={profile.username} className="user-img" />
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
              <ArticleList
                articles={articles}
                articlesCount={articlesCount}
                currentPage={currentPage}
                onSetPage={this.onSetPage}
              />
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
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
  onSetPage: (page, payload) => dispatch({ type: 'SET_PAGE', page, payload })
});

export { Profile, mapStateToProps };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { Component } from 'react';
import { Link } from 'react-router';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">Sign in</Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">Sign up</Link>
        </li>
      </ul>
    );
  }

  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link"
          >
            <img src={props.currentUser.image} className="user-pic" alt={`@${props.currentUser.username}`} />
            {props.currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
}

export default class Header extends Component {
  render() {
    const { currentUser, appName } = this.props;

    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {appName.toLowerCase()}
          </Link>
          <LoggedOutView currentUser={currentUser} />
          <LoggedInView currentUser={currentUser} />
        </div>
      </nav>
    );
  }
}

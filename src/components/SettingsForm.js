import React, { Component } from 'react';

export default class SettingsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };
  }

  updateState = (field) => event => {
    const oldState = this.state;
    const newState = Object.assign({}, oldState, { [field]: event.target.value });
    this.setState(newState);
  }

  submitForm = event => {
    event.preventDefault();

    const user = Object.assign({}, this.state);
    if (!user.password) {
      delete user.password;
    }

    this.props.onSubmitForm(user);
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={this.state.image}
              onChange={this.updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Your short bio"
              value={this.state.bio}
              onChange={this.updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={this.updateState('password')} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.isInProgress}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    );
  }
}

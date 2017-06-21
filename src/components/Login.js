import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ListErrors from './ListErrors';

import agent from '../agent';

import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

class Login extends Component {
  handleFieldChange = (name) => event => this.props.onChangeField(name, event.target.value)

  submitForm = (email, password) => event => {
    event.preventDefault();
    this.props.onSubmit(email, password);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { email, password, errors, isInProgress } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>

              <ListErrors errors={errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleFieldChange('email')}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleFieldChange('password')}
                     />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={isInProgress}
                  >
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeField: (key, value) => dispatch({ type: UPDATE_FIELD_AUTH, key, value }),
  onSubmit: (email, password) => dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

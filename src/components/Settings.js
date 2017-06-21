import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListErrors from './ListErrors';
import SettingsForm from './SettingsForm';

import agent from '../agent';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

class Settings extends Component {
  render() {
    const { errors, currentUser } = this.props;

    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={errors} />

              <SettingsForm
                currentUser={currentUser}
                onSubmitForm={this.props.onSubmitForm}
              />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onLogout}
              >
                Or click here to logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user => {
    const payload = agent.Auth.save(user);
    dispatch({ type: SETTINGS_SAVED, payload });
  },
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

import React, { Component } from 'react';

export default class ListErrors extends Component {
  render() {
    const errors = this.props.errors;

    if (errors) {
      return (
        <ul className="error-messages">
          {Object.keys(errors).map(key => <li key={key}>{key} {errors[key]}</li>)}
        </ul>
      );
    } else {
      return null;
    }
  }
}

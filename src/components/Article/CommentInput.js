import React, { Component } from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

class CommentInput extends Component {
  constructor() {
    super();

    this.state = {
      body: ''
    };

    this.handleBodyChange = event => {
      this.setState({ body: event.target.value });
    };

    this.createComment = event => {
      event.preventDefault();
      const payload = agent.Comments.create(this.props.slug, { body: this.state.body });
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.handleBodyChange}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            alt={this.props.currentUser.username}
            className="comment-author-img"
          />
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: 'ADD_COMMENT', payload })
});

export default connect(null, mapDispatchToProps)(CommentInput);

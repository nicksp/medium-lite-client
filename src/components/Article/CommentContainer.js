import React from 'react';
import { Link } from 'react-router';

import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ListErrors from '../ListErrors';

function CommentContainer({ currentUser, errors, slug, comments }) {
  if (currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={errors}></ListErrors>
          <CommentInput slug={slug} currentUser={currentUser} />
        </div>

        <CommentList comments={comments}
          slug={slug}
          currentUser={currentUser}
        />
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">Sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList comments={comments}
          slug={slug}
          currentUser={currentUser}
        />
      </div>
    );
  }
}

export default CommentContainer;

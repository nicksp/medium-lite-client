import React from 'react';

import Comment from './Comment';

function CommentList({ currentUser, comments, slug }) {
  return (
    <div>
      {
        comments.map(comment => (
          <Comment
            comment={comment}
            currentUser={currentUser}
            slug={slug}
            key={comment.id}
          />
        ))
      }
    </div>
  );
}

export default CommentList;

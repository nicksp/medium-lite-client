import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

function DeleteButton({ slug, commentId, onClick, show }) {
  const del = () => {
    const payload = agent.Comments.del(slug, commentId);
    onClick(payload, commentId);
  };

  if (show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }

  return null;
}

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) => dispatch({ type: 'DELETE_COMMENT', payload, commentId })
});

export default connect(null, mapDispatchToProps)(DeleteButton);

import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

import { DELETE_COMMENT } from '../../constants/actionTypes';

function DeleteButton({ slug, commentId, onClick, show }) {
  const del = () => {
    const payload = agent.Comments.delete(slug, commentId);
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
  onClick: (payload, commentId) => dispatch({ type: DELETE_COMMENT, payload, commentId })
});

export default connect(null, mapDispatchToProps)(DeleteButton);

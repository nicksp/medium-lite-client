import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import agent from '../../agent';

import { DELETE_ARTICLE } from '../../constants/actionTypes';

function ArticleActions({ article, canModify, handleDelete }) {
  const del = () => handleDelete(agent.Articles.delete(article.slug));

  if (canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    );
  }

  return <span />;
}

const mapDispatchToProps = dispatch => ({
  handleDelete: payload => dispatch({ type: DELETE_ARTICLE, payload })
});

export default connect(null, mapDispatchToProps)(ArticleActions);

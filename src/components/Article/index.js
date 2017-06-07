import React, { Component } from 'react';
import marked from 'marked';
import { connect } from 'react-redux';

import agent from '../../agent';

import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';

class Article extends Component {
  constructor(props) {
    super(props);

    const articleId = props.params.id;

    props.onLoad(Promise.all([
      agent.Articles.get(articleId),
      agent.Comments.getForArticle(articleId)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { article, currentUser, comments, commentErrors, params } = this.props;

    if (!article) {
      return null;
    }

    const markup = { __html: marked(article.body) };
    const canModify = currentUser && currentUser.username === article.author.username;

    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta article={article} canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup} />

              <ul className="tag-list">
                {
                  article.tagList.map(tag => (
                    <li className="tag-default tag-pill tag-outline" key={tag}>{tag}</li>
                  ))
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions" />

          <div className="row">
            <CommentContainer comments={comments || []}
              errors={commentErrors}
              slug={params.id}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'ARTICLE_PAGE_LOADED', payload }),
  onUnload: () => dispatch({ type: 'ARTICLE_PAGE_UNLOADED' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

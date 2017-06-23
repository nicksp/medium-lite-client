import React from 'react';
import Promise from 'bluebird';

import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';

function ArticleList(props) {
  if (!props.articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (!props.articles.length) {
    return <div className="article-preview">No articles are here.</div>;
  }

  return (
    <div>
      {
        props.articles.map(article => <ArticlePreview key={article.slug} article={article} />)
      }
      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
}

export default ArticleList;

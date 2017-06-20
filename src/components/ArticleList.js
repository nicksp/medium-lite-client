import React from 'react';

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
      {props.articles.map(article => <ArticlePreview key={article.slug} article={article} />)}
      <ListPagination
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
        onSetPage={props.onSetPage}
      />
    </div>
  );
}

export default ArticleList;

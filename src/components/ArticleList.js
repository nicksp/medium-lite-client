import React from 'react';

function ArticleList(props) {
  if (!props.articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (!props.articles.length) {
    return <div className="article-preview">No articles are here.</div>;
  }

  return (
    <div>
      {props.articles.map(article => (<h2>{article.title}</h2>))}
    </div>
  );
}

export default ArticleList;

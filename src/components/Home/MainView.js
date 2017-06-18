import React from 'react';
import { connect } from 'react-redux';

import ArticleList from '../ArticleList';

import agent from '../../agent';

function YourFeedTab(props) {
  if (props.token) {
    const clickHandler = event => {
      event.preventDefault();
      props.onTabClick('feed', agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <a href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
}

function GlobalFeedTab(props) {
  const clickHandler = event => {
    event.preventDefault();
    props.onTabClick('all', agent.Articles.all());
  };

  return (
    <li className="nav-item">
      <a href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
}

function MainView({ articles, tab, token, onTabClick }) {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={token}
            tab={tab}
            onTabClick={onTabClick}
          />
          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />
        </ul>
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: 'CHANGE_TAB', tab, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

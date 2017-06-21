import React from 'react';
import { connect } from 'react-redux';

import agent from '../agent';

import { SET_PAGE } from '../constants/actionTypes';

function ListPagination(props) {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];

  for (let i = 0; i < Math.ceil(props.articlesCount / 10); i++) {
    range.push(i);
  }

  const setPage = page => {
    if (props.pager) {
      props.onSetPage(page, props.pager(page));
    } else {
      props.onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = event => {
              event.preventDefault();
              setPage(v);
            };

            return (
              <li
                className={isCurrent ? 'page-item active': 'page-item'}
                onClick={onClick}
                key={v.toString()}
              >
                <a href="" className="page-link">{v + 1}</a>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload })
});

export default connect(null, mapDispatchToProps)(ListPagination);

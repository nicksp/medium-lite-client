import React from 'react';

import agent from '../../agent';

function Tags({ tags, onTagSelect }) {
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {
            const handleClick = event => {
              event.preventDefault();
              onTagSelect(tag, agent.Articles.byTag(tag));
            };

            return (
              <a href=""
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}
              >
                {tag}
              </a>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
}

export default Tags;

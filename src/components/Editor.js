import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListErrors from './ListErrors';

import agent from '../agent';

class Editor extends Component {
  constructor(props) {
    super(props);

    const handleFieldUpdate = key => event => props.onUpdateField(key, event.target.value);
    this.changeTitle = handleFieldUpdate('title');
    this.changeDescription = handleFieldUpdate('description');
    this.changeBody = handleFieldUpdate('body');
    this.changeTagInput = handleFieldUpdate('tagInput');

    // When entering tags, hitting enter adds a tag to the list
    this.watchForEnter = event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        props.onAddTag();
      }
    };

    this.handleTagRemove = tag => () => props.onRemoveTag(tag);

    // If we have a slug, we're updating an article,
    // otherwise we're creating a new one.
    this.submitForm = event => {
      event.preventDefault();
      const article = {
        title: props.title,
        description: props.description,
        body: props.body,
        tagList: props.tagList
      };

      const slug = { slug: props.articleSlug };
      const promise = props.articleSlug
        ? agent.Articles.update(Object.assign(article, slug))
        : agent.Articles.create(article);

      props.onSubmit(promise);
    };

    if (props.params.slug) {
      return props.onLoad(agent.Articles.get(props.params.slug));
    }
    props.onLoad(null);
  }

  /**
   * React-router has an interesting quirk: if two routes have the
   * same component, react-router will reuse the component when
   * switching between the two. So if '/editor' and '/editor/:slug'
   * both use the 'Editor' component, react-router won't recreate
   * the Editor component if you navigate to '/editor' from '/editor/:slug'.
   * To work around this, we need the `componentWillReceiveProps()` hook.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={this.props.errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article title"
                      value={this.props.title}
                      onChange={this.changeTitle}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (markdown supported)"
                      value={this.props.body}
                      onChange={this.changeBody}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                    />
                  </fieldset>

                  <div className="tag-list">
                    {
                      (this.props.tagList || []).map(tag => (
                        <span className="tag-default tag-pill" key={tag}>
                          <i className="ion-close-round" onClick={this.handleTagRemove(tag)}> {tag}</i>
                        </span>
                      ))
                    }
                  </div>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({ type: 'ADD_TAG' }),
  onRemoveTag: tag => dispatch({ type: 'REMOVE_TAG', tag }),
  onLoad: payload => dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onUnload: () => dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onSubmit: payload => dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
  onUpdateField: (key, value) => dispatch({ type: 'EDITOR_UPDATE_FIELD', key, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

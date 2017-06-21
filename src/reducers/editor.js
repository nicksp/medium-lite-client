import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  EDITOR_UPDATE_FIELD
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagList: action.payload ? action.payload.article.tagList : [],
        tagInput: ''
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case ARTICLE_SUBMITTED:
      return {
        ...state,
        isInProgress: null,
        errors: action.error ? action.payload.errors : null
      };
      case ASYNC_START:
        if (action.subtype === ARTICLE_SUBMITTED) {
          return {
            ...state,
            isInProgress: true
          };
        }
        return state;
      case ADD_TAG:
        return {
          ...state,
          tagList: state.tagList.concat([state.tagInput]),
          tagInput: ''
        };
      case REMOVE_TAG:
        return {
          ...state,
          tagList: state.tagList.filter(tag => tag !== action.tag)
        };
      case EDITOR_UPDATE_FIELD:
        return {
          ...state,
          [action.key]: action.value
        };
    default:
      return state;
  }
};

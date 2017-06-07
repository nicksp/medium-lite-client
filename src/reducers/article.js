export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null : (state.comments || []).concat([action.payload.comment])
      };
      break;
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.commentId)
      };
      break;
    case 'ARTICLE_PAGE_LOADED':
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };
      break;
    case 'ARTICLE_PAGE_UNLOADED':
      return {};
      break;
    default:
      return state;
  }
}

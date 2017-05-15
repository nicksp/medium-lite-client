const initialState = {
  aticles: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload.articles
      };
    default:
      return state;
  }
}

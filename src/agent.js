import superagent from 'superagent';

const API_ROOT = 'https://medium-lite.herokuapp.com/api';

const encode = encodeURIComponent;
const getResponseBody = response => response.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(getResponseBody),
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(getResponseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getResponseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getResponseBody)
};

const limit = (count, page) => `limit=${count}&offset=${page ? page * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });

const Articles = {
  all: page => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) => requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) => requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  unfavorite: slug => requests.del(`/articles/${slug}/favorite`),
  delete: slug => requests.del(`/articles/${slug}`),
  favoritedBy: (author, page) => requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: page => requests.get(`/articles/feed?${limit(10, page)}`),
  get: slug => requests.get(`/articles/${slug}`),
  create: article => requests.post('/articles', { article }),
  update: article => requests.put(`/articles/${article.slug}`, { article: omitSlug(article) })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  unfollow: username => requests.del(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`)
};

const Comments = {
  getForArticle: slug => requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) => requests.del(`/articles/${slug}/comments/${commentId}`)
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/user', { user })
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};

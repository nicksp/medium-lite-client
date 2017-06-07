import superagent from 'superagent';

const API_ROOT = 'https://api/server/path';

const getResponseBody = response => response.body;

const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`).then(getResponseBody),
  get: url => superagent.get(`${API_ROOT}${url}`).then(getResponseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).then(getResponseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).then(getResponseBody)
};

const Articles = {
  all: page => requests.get('/articles?limit=10'),
  byAuthor: (author) => requests.get(`/articles?author=${encodeURIComponent(author)}&limit=5`),
  del: slug => requests.del(`/articles/${slug}`),
  favoritedBy: (author) => requests.get(`/articles?favorited=${encodeURIComponent(author)}&limit=5`),
  get: slug => requests.get(`/articles/${slug}`)
};

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  unfollow: username => requests.del(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`)
};

const Comments = {
  getForArticle: slug => requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  del: (slug, commentId) => requests.del(`/articles/${slug}/comments/${commentId}`)
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/user', { user })
};

let token = null;

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  setToken: _token => { token = _token; }
};

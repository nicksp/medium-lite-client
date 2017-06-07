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
  del: slug => requests.del(`/articles/${slug}`),
  get: slug => requests.get(`/articles/${slug}`)
};

const Comments = {
  getForArticle: slug => requests.get(`/articles/${slug}/comments`)
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
  setToken: _token => { token = _token; }
};

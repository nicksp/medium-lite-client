import superagent from 'superagent';

const API_ROOT = 'https://api/server/path';

const getResponseBody = response => response.body;

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).then(getResponseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).then(getResponseBody)
};

const Articles = {
  all: page => requests.get('/articles?limit=10')
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } })
};

let token = null;

export default {
  Articles,
  Auth,
  setToken: _token => { token = _token; }
};

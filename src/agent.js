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
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  current: () => requests.get('/user')
};

let token = null;

export default {
  Articles,
  Auth,
  setToken: token => { token }
};

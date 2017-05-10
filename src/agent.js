import superagent from 'superagent';

const API_ROOT = 'https://api/server/path';

const getResponseBody = response => response.body;

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).then(getResponseBody)
};

const Articles = {
  all: page => requests.get('/articles?limit=10')
};

export default {
  Articles
};
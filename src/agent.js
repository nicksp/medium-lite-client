import superagent from 'superagent';

const API_ROOT = 'https://api/server/path';

const getResponseBody = response => response.body;

const limit = (count, page) => `limit=${count}&offset=${page ? page * count : 0}` ;
const encode = encodeURIComponent;
const omitSlug = article => Object.assign({}, article, { slug: undefined });

const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`).then(getResponseBody),
  get: url => superagent.get(`${API_ROOT}${url}`).then(getResponseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).then(getResponseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).then(getResponseBody)
};

const Articles = {
  all: page => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) => requests.get(`/articles?author=${encode(author)}&${limit(10, page)}`),
  byTag: (tag, page) => requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug => requests.del(`/articles/${slug}`),
  favoritedBy: (author, page) => requests.get(`/articles?favorited=${encode(author)}&${limit(10, page)}`),
  feed: page => requests.get(`/articles/feed?l${limit(10, page)}`),
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
  Tags,
  setToken: _token => { token = _token; }
};

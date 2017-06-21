# Medium Clone Client App

## Getting Started

To get the frontend running locally:

- Clone this repo `git clone https://github.com/nicksp/medium-lite-client.git`
- `yarn install` to install all the required dependencies
- `yarn start` to start the local server

### Making requests to the backend API

The source code for the backend server (Node/Express based) can be found in [this repo](https://github.com/nicksp/medium-lite-api-server).

If you want to change the API URL to a local server, simply edit `src/agent.js` and change `API_ROOT` to the local server's URL (i.e. `http://localhost:3000/api`).

## Functionality Overview

The example application is a social blogging site (i.e. a Medium.com lite clone). It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages)
- CRU* users (sign up & settings page)
- CRUD articles
- CR*D comments on articles
- GET and display paginated lists of articles
- Favorite/Unfavorite articles
- Follow/Unfollow other users

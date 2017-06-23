module.exports = {
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "plugins": ["react"],
  "env": {
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-unused-vars": 0
  }
}

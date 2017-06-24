module.exports = {
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "plugins": ["react"],
  "env": {
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "no-unused-vars": "off"
  }
}

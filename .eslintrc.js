module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jasmine": true,
    "es6": true
  },
  "rules": {
    "func-names": ["error", "never"],
    "no-use-before-define": ["warn", { "functions": false }],
    "no-undef": "warn",
    "no-unused-vars": "warn",
    "no-extend-native": "warn"
  }
}

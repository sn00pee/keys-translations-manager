module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'comma-dangle': 0,
    'no-param-reassign': 'off',
  },
  overrides: {
    files: ["frontend/src/**/*"],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

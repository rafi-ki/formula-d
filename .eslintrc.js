module.exports = {
  root: true,

  env: {
    es2022: true,
  },

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 'off',
    "linebreak-style": 0
  },

  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/airbnb',
  ],
};

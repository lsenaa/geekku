module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off', // 사용안한 변수 알림 비활성화
    'react/prop-types': 'off', //props알림 비활성화
    'react/jsx-no-comment-textnodes': 'off', // 주석 위치 경고 비활성화
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['eslint-config-standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-promise'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
}

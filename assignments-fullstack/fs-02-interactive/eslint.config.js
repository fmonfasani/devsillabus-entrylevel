export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        URL: 'readonly',
        process: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error'
    }
  }
];

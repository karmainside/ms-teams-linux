module.exports = {
  extends: [
    'airbnb-base/rules/imports',
    'airbnb-base/rules/node.js',
    'airbnb-base/rules/variables',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  plugins: ['import'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          'e2e/**/*.js',
          'scripts/**/*.js',
          'tasks/**/*.js',
        ],
      },
    ],
  },
};

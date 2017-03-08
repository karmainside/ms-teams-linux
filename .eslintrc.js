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
    'import/no-extraneous-dependencies': 'off',
  },
};

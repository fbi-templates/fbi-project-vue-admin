module.exports = {
  useEslintrc: false,
  root: true,
  cache: false,
  emitError: true,
  failOnError: true,
  emitWarning: true,
  fix: true,
  // extends: ['eslint-config-standard'],
  // parser: 'babel-eslint',
  eslintPath: require.resolve('eslint'),
  formatter: require('eslint/lib/formatters/codeframe'),
  // parserOptions: {
  //   ecmaVersion: 8,
  //   sourceType: 'module',
  //   ecmaFeatures: {
  //     experimentalObjectRestSpread: true
  //   }
  // },
  // env: {
  //   browser: true
  // },
  extends: ['plugin:vue/essential'],
  plugins: ['eslint-plugin-vue'],
  // https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // rules docs: https://standardjs.com/rules.html
    semi: ['error', 'never'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ]
  }
}

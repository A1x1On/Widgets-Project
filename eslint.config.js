module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],

  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },

  plugins: ['vue', '@typescript-eslint', 'optimize-regex'],

  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],

    '@typescript-eslint/no-empty-interface': 'off',

    '@typescript-eslint/no-empty-function': 'off',

    'vue/no-v-html': 'off',
    'vue/require-v-for-key': 'error',
    'vue/no-use-v-if-with-v-for': 'error',

    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-param-reassign': 'error',
    'no-unused-expressions': 'error',
    'no-dupe-else-if': 'error',
    'no-bitwise': 'off',
    'no-setter-return': 'error',
    'prefer-promise-reject-errors': 'off',
    'consistent-return': 'off',
    'func-names': 'off',

    'optimize-regex/optimize-regex': 'error',
  },
}

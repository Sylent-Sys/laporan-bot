/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    root: true,
    parserOptions: {
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['node_modules', 'dist'],
    rules: {
        "prettier/prettier": 2
    }
};
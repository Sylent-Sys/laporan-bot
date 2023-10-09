/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict-type-checked', 'plugin:@typescript-eslint/stylistic-type-checked', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    root: true,
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    ignorePatterns: ['node_modules', 'dist'],
    rules: {
        "prettier/prettier": 2
    }
};
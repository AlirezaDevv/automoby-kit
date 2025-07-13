module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'jsx-a11y/anchor-has-content': 'off',
    'react/function-component-definition': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        peerDependencies: false,
        devDependencies: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

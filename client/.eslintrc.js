module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  "parser": "babel-eslint",
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    "prettier/react",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   ecmaVersion: 2018,
  //   sourceType: 'module',
  // },
  plugins: [
    'react',
    'unused-imports'
  ],
  rules: {
    // temporary
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    // temporary
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/no-static-element-interactions": 0,
    // temporary
    "react/forbid-prop-types": "off",
    "import/prefer-default-export": 0,
    "react/jsx-no-undef": 0,
    "consistent-return": 0,
    "no-unreachable": 0,
    "no-param-reassign": 0,
    "no-restricted-syntax": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "guard-for-in": 0,
    "unused-imports/no-unused-vars": 0,
    "react/prefer-stateless-function": 0,
    "react/no-access-state-in-setstate": 0,
    "react/no-access-state-in-setstate": 0,
    // temporary
    "react/jsx-filename-extension": "off",
    "class-methods-use-this": "off",
    "jsx-a11y": "off",
    "func-names": 0,
    "no-multi-str": 0,
    "react/no-deprecated": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/iframe-has-title": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "react/jsx-a11y": "off",
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": "off",
    "react/button-has-type": "off",
    "no-useless-escape": "off",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": 2,
    "unused-imports/no-unused-vars": 1
  },
};
